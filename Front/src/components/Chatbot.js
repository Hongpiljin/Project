import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [awaitingInput, setAwaitingInput] = useState(null);
  const messagesEndRef = useRef(null);

  const API_URL = "http://localhost:9999/ChatBot";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendMessage("안녕하세요 ^^ 항상 행복을 전하는 C car 입니다.", true);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (message, isBot = false) => {
    if (!isBot && message.trim() === "") return;

    const newMessages = [...messages, { sender: isBot ? "bot" : "user", text: message }];
    setMessages(newMessages);
    setInput("");

    if (!isBot) {
      let botResponse = "";

      if (message === "지역 차량 조회") {
        botResponse = "지역 차량 조회하실 지역 이름을 입력해주세요.";
        setAwaitingInput("지역조회");
      } else if (message === "차량 상세 조회") {
        botResponse = "차량 상세정보를 조회하실 차량 번호를 입력해주세요.";
        setAwaitingInput("상세조회");
      } else if (message === "고객센터 문의") {
        botResponse = "고객센터 문의를 진행하시려면 다음 링크를 클릭해주세요: http://localhost:3000/customer-service";
      } else if (awaitingInput === "지역조회") {
        try {
          const response = await axios.post(API_URL, { userMessage: message }, { headers: { "Content-Type": "application/json" } });
          botResponse = response.data.message;
        } catch (error) {
          botResponse = "지역 조회 중 오류가 발생했습니다.";
        }
        setAwaitingInput(null);
      } else if (awaitingInput === "상세조회") {
        try {
          const response = await axios.post(API_URL, { userMessage: `상세조회 ${message}` }, { headers: { "Content-Type": "application/json" } });
          botResponse = response.data.message;
        } catch (error) {
          botResponse = "상세 조회 중 오류가 발생했습니다.";
        }
        setAwaitingInput(null);
      } else {
        try {
          const response = await axios.post(API_URL, { userMessage: message }, { headers: { "Content-Type": "application/json" } });
          botResponse = response.data.message;
        } catch (error) {
          botResponse = "오류가 발생했습니다. 다시 시도해주세요.";
        }
      }

      setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    }
  };

  return (
    <div>
      {/* 챗봇 열기/닫기 버튼 */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 18px",
          backgroundColor: "#FF0000", // 빨간색 버튼
          color: "#FFFFFF", // 흰색 글씨
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
            backgroundColor: "#000000", // 검은색 챗봇 창
            color: "#FFFFFF", // 흰색 폰트
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
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: "20px",
                    maxWidth: "75%",
                    backgroundColor: msg.sender === "user" ? "#333333" : "#555555",
                    color: "#FFFFFF",
                    fontSize: "14px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 버튼 영역 */}
          <div style={{ display: "flex", justifyContent: "space-around", padding: "10px" }}>
            <button onClick={() => sendMessage("지역 차량 조회")} style={buttonStyle()}>
              지역 차량 조회
            </button>
            <button onClick={() => sendMessage("차량 상세 조회")} style={buttonStyle()}>
              차량 상세 조회
            </button>
            <button onClick={() => sendMessage("고객센터 문의")} style={buttonStyle()}>
              고객센터 문의
            </button>
          </div>

          {/* 입력창 */}
          <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #444444" }}>
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
  backgroundColor: "#FF0000", // 빨간색 버튼
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "12px",
});

export default Chatbot;
