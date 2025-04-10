import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const AgentChat = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId"); // URL에서 roomId 추출
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const SERVER_URL = "http://localhost:9999";

  // Redux auth 상태에서 로그인된 사용자 정보 가져오기
  // auth state에 { user: { userNo, userId, role, ... } }가 저장되어 있다고 가정
  const { user } = useSelector((state) => state.auth);
  // 로그인된 사용자가 없으면 CONSULTANT_ID는 null
  const CONSULTANT_ID = user ? user.userNo : null;

  // 디버깅 로그: 로그인 정보와 consultantId 확인
  useEffect(() => {
    console.log("auth state:", user);
    console.log("CONSULTANT_ID:", CONSULTANT_ID);
  }, [user, CONSULTANT_ID]);

  useEffect(() => {
    if (roomId) {
      const socket = new SockJS(`${SERVER_URL}/ws-stomp`);
      const client = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        onConnect: () => {
          console.log(`상담원이 room ${roomId}에 연결되었습니다.`);
          client.subscribe(`/topic/chatroom.${roomId}`, (message) => {
            const body = JSON.parse(message.body);
            console.log("수신 메시지:", body);
            // 만약 서버에서 돌아온 메시지의 senderId가 내 CONSULTANT_ID와 같다면 내 메시지이므로 무시
            if (body.senderId === CONSULTANT_ID) {
              console.log("내 메시지 무시:", body.senderId);
              return;
            }
            setMessages((prev) => [...prev, body]);
          });
        },
        onStompError: (frame) => {
          console.error("Stomp 에러:", frame.headers["message"]);
          console.error("추가 정보:", frame.body);
        },
      });
      client.activate();
      setStompClient(client);

      return () => client.deactivate();
    }
  }, [roomId, SERVER_URL, CONSULTANT_ID]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // sendMessage 함수 수정: 메시지 객체에 senderId와 message 키 사용
  const sendMessage = () => {
    if (!input.trim()) return;
    if (!CONSULTANT_ID) {
      console.error("로그인된 사용자 정보가 없습니다.");
      return;
    }
    const messageObj = {
      roomId: roomId,
      senderId: CONSULTANT_ID,
      message: input,
      sentAt: new Date().toISOString(),
    };
    console.log("전송 메시지:", messageObj);
    // 로컬 상태에 내 메시지를 추가 (서버에서 다시 echo되는 경우 구독 콜백에서 무시됨)
    setMessages((prev) => [...prev, messageObj]);
    setInput("");

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(messageObj),
      });
    }
  };

  const closeChat = async () => {
    try {
      await axios.post(`${SERVER_URL}/chat/close`, null, { params: { roomId } });
      if (stompClient) {
        stompClient.deactivate();
        setStompClient(null);
      }
      const endMsg = {
        senderId: CONSULTANT_ID,
        message: "상담이 종료되었습니다.",
        sentAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, endMsg]);
    } catch (error) {
      console.error("상담 종료 오류:", error);
    }
  };

  return (
    <div style={containerStyle()}>
      <h2>상담원 채팅방</h2>
      <div style={chatBoxStyle()}>
      {messages.map((msg, index) => (
  <div
    key={index}
    style={
      msg.senderId === CONSULTANT_ID ? consultantMsgStyle() : userMsgStyle()
    }
  >
    <div>
      <span>
        {msg.senderId === CONSULTANT_ID ? "나" : "사용자"}: {msg.message}
      </span>
    </div>
    {msg.sentAt && (
      <div>
        <span style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>
          {new Date(msg.sentAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    )}
  </div>
))}
        <div ref={messagesEndRef} />
      </div>
      <div style={inputAreaStyle()}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={inputStyle()}
        />
        <button onClick={sendMessage} style={buttonStyle()}>
          보내기
        </button>
        <button onClick={closeChat} style={{ ...buttonStyle(), marginLeft: "5px" }}>
          상담 종료
        </button>
      </div>
    </div>
  );
};

// 스타일 정의
const containerStyle = () => ({
  width: "400px",
  margin: "20px auto",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "10px",
  backgroundColor: "#f9f9f9",
});
const chatBoxStyle = () => ({
  height: "300px",
  overflowY: "auto",
  border: "1px solid #ddd",
  padding: "10px",
  marginBottom: "10px",
});
const consultantMsgStyle = () => ({
  textAlign: "right",
  margin: "5px 0",
  color: "#007BFF",
});
const userMsgStyle = () => ({
  textAlign: "left",
  margin: "5px 0",
});
const inputAreaStyle = () => ({
  display: "flex",
});
const inputStyle = () => ({
  flex: 1,
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
});
const buttonStyle = () => ({
  padding: "8px 12px",
  backgroundColor: "#FF0000",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});

export default AgentChat;
