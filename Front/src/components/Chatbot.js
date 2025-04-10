import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";

const Chatbot = () => {
  // 기존 챗봇 상태들
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [awaitingInput, setAwaitingInput] = useState(null);
  const messagesEndRef = useRef(null);

  // 상담 관련 상태 추가
  const [roomId, setRoomId] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  const API_URL = "http://localhost:9999/ChatBot/webhook"; // 기존 챗봇 API URL
  const SERVER_URL = "http://localhost:9999"; // 백엔드 서버 URL

  // Redux에서 로그인된 사용자 정보 가져오기
  const { user } = useSelector((state) => state.auth);
  const USER_NO = user ? user.userNo : null;

  useEffect(() => {
    console.log("auth state:", user);
    console.log("USER_NO:", USER_NO);
  }, [user, USER_NO]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // 봇 메시지 추가 시 sentAt을 현재 시간으로 설정
      addMessage("안녕하세요 ^^ 항상 행복을 전하는 C car 입니다.", "bot", new Date().toISOString());
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // addMessage 함수에 sentAt 추가 (기본값은 현재 시간)
  const addMessage = (text, sender = "bot", sentAt = new Date().toISOString()) => {
    setMessages((prev) => [...prev, { sender, text, sentAt }]);
  };

  // 상담 메시지 전송 함수
  const sendMessage = async (message, isBot = false) => {
    if (!isBot && message.trim() === "") return;

    // 1) 사용자/봇 메시지를 화면에 표시 (사용자 메시지에 현재 시간 포함)
    setMessages((prev) => [
      ...prev,
      { sender: isBot ? "bot" : "user", text: message, sentAt: new Date().toISOString() },
    ]);
    setInput("");

    // 2) 상담 중이면 WebSocket을 통해 메시지 전송
    if (!isBot && roomId && stompClient && stompClient.connected) {
      const messageObj = {
        roomId: roomId,
        senderId: USER_NO, // 로그인된 사용자 정보 사용
        message: message,
      };
      console.log("전송 메시지:", messageObj);
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(messageObj),
      });
      return; // 서버 브로드캐스트는 내 메시지일 경우 구독 콜백에서 무시됨
    }

    // 3) 상담 중이 아니면 기존 챗봇 응답 처리 (REST API 호출)
    if (!isBot && !roomId) {
      let botResponse = "";
      if (message === "지역 차량 조회") {
        botResponse = "지역 차량 조회하실 지역 이름을 입력해주세요.";
        setAwaitingInput("지역조회");
      } else if (message === "차량 상세 조회") {
        botResponse = "차량 상세정보를 조회하실 차량 번호를 입력해주세요.";
        setAwaitingInput("상세조회");
      } else if (message === "고객센터 문의") {
        botResponse =
          "고객센터 문의를 진행하시려면 다음 링크를 클릭해주세요: http://localhost:3000/customer-service";
      } else if (awaitingInput === "지역조회") {
        try {
          const response = await axios.post(
            API_URL,
            { userMessage: message },
            { headers: { "Content-Type": "application/json" } }
          );
          botResponse = response.data.message;
        } catch (error) {
          botResponse = "지역 조회 중 오류가 발생했습니다.";
        }
        setAwaitingInput(null);
      } else if (awaitingInput === "상세조회") {
        try {
          const response = await axios.post(
            API_URL,
            { userMessage: `상세조회 ${message}` },
            { headers: { "Content-Type": "application/json" } }
          );
          botResponse = response.data.message;
        } catch (error) {
          botResponse = "상세 조회 중 오류가 발생했습니다.";
        }
        setAwaitingInput(null);
      } else {
        try {
          const response = await axios.post(
            API_URL,
            { userMessage: message },
            { headers: { "Content-Type": "application/json" } }
          );
          botResponse = response.data.message;
        } catch (error) {
          botResponse = "오류가 발생했습니다. 다시 시도해주세요.";
        }
      }
      // 봇 응답 메시지에도 백엔드에서 받은 sentAt 필드가 있다면 그대로 사용하고, 그렇지 않으면 현재 시간으로 설정
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse, sentAt: new Date().toISOString() },
      ]);
    }
  };

  // 상담원 연결: 채팅방 생성 후 WebSocket 연결
  const handleConsultationConnect = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/chat/start`, null, {
        params: { userNo: USER_NO, userName: user.name },
      });
      console.log(response);
      const newRoomId = response.data;
      setRoomId(newRoomId);
      const socket = new SockJS(`${SERVER_URL}/ws-stomp`);
      const client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        onConnect: () => {
          client.subscribe(`/topic/chatroom.${newRoomId}`, (message) => {
            const body = JSON.parse(message.body);
            console.log("수신 메시지:", body);
            if (String(body.senderId) === String(USER_NO)) {
              console.log("내 메시지 무시:", body.senderId);
              return;
            }
            // 백엔드로부터 받은 메시지에 sentAt 필드가 있다면 함께 추가
            setMessages((prev) => [
              ...prev,
              { sender: "consultant", text: body.message, sentAt: body.sentAt },
            ]);
          });
          addMessage("상담이 시작됩니다. 잠시만 기다려주세요 ~!", "bot", new Date().toISOString());
        },
      });
      client.activate();
      setStompClient(client);
    } catch (error) {
      console.error("상담원 연결 실패:", error);
      addMessage("상담원 연결 중 오류가 발생했습니다.", "bot", new Date().toISOString());
    }
  };

  // 상담 종료: 채팅방 종료 API 호출 및 WebSocket 연결 종료
  const handleConsultationEnd = async () => {
    if (roomId) {
      try {
        await axios.post(`${SERVER_URL}/chat/close`, null, { params: { roomId } });
        if (stompClient) {
          stompClient.deactivate();
          setStompClient(null);
        }
        addMessage("상담이 종료되었습니다.", "bot", new Date().toISOString());
        setRoomId(null);
      } catch (error) {
        console.error("상담 종료 실패:", error);
        addMessage("상담 종료 중 오류가 발생했습니다.", "bot", new Date().toISOString());
      }
    }
  };

  return (
    <div>
      {/* 챗봇 열기/닫기 버튼 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 18px",
          backgroundColor: "#FF0000",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "50px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {isOpen ? "챗봇 닫기" : "챗봇 열기"}
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "500px",
            backgroundColor: "#000000",
            color: "#FFFFFF",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          {/* 메시지 창 */}
          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: "20px",
                    maxWidth: "75%",
                    backgroundColor:
                      msg.sender === "user"
                        ? "#333333"
                        : msg.sender === "consultant"
                        ? "#007BFF"
                        : "#555555",
                    color: "#FFFFFF",
                    fontSize: "14px",
                  }}
                >
                  {msg.text}
                </div>
                {msg.sentAt && (
                  <span style={{ fontSize: "10px", color: "#CCCCCC", marginTop: "2px" }}>
                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 버튼 영역 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "10px",
            }}
          >
            <button onClick={() => sendMessage("지역 차량 조회")} style={buttonStyle()}>
              지역 차량 조회
            </button>
            <button onClick={() => sendMessage("차량 상세 조회")} style={buttonStyle()}>
              차량 상세 조회
            </button>
            <button onClick={() => sendMessage("고객센터 문의")} style={buttonStyle()}>
              고객센터 문의
            </button>
            {roomId ? (
              <button onClick={handleConsultationEnd} style={buttonStyle()}>
                상담 종료
              </button>
            ) : (
              <button onClick={handleConsultationConnect} style={buttonStyle()}>
                상담원 연결하기
              </button>
            )}
          </div>

          {/* 입력창 */}
          <div
            style={{ display: "flex", padding: "10px", borderTop: "1px solid #444444" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #555555",
                backgroundColor: "#222222",
                color: "#FFFFFF",
                outline: "none",
              }}
              placeholder="메시지를 입력하세요..."
            />
            <button onClick={() => sendMessage(input)} style={{ ...buttonStyle(), marginLeft: "5px" }}>
              보내기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 챗봇 내부 버튼 스타일
const buttonStyle = () => ({
  padding: "10px",
  backgroundColor: "#FF0000",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "12px",
});

export default Chatbot;
