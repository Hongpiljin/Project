import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const SERVER_URL = "http://localhost:9999";

  // 채팅방 목록을 가져오는 함수
  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}/chat/rooms`, {
        params: { status: "waiting" },
      });
      setChatRooms(response.data); // response.data는 채팅방 목록
    } catch (error) {
      console.error("채팅방 목록 조회 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const handleRoomClick = (roomId) => {
    // 상담원 전용 채팅 페이지로 이동
    navigate(`/agent-chat?roomId=${roomId}`);
  };

  // 수락 버튼 클릭 시 API 호출
  const handleAccept = async (roomId) => {
    try {
      const consultantId = 1; // 테스트용, 실제로는 로그인한 상담원의 ID로 대체
      await axios.post(`${SERVER_URL}/chat/accept`, null, { params: { roomId, consultantId } });
      // 상태 업데이트 후, 목록 새로고침
      setChatRooms(chatRooms.filter((room) => room.roomId !== roomId));
      navigate(`/agent-chat?roomId=${roomId}`); // 수락 후 바로 채팅방 입장
    } catch (error) {
      console.error("채팅방 수락 실패:", error);
    }
  };

  // 거절 버튼 클릭 시 API 호출
  const handleReject = async (roomId) => {
    try {
      await axios.post(`${SERVER_URL}/chat/reject`, null, { params: { roomId } });
      // 거절 후 목록에서 해당 채팅방 제거
      setChatRooms(chatRooms.filter((room) => room.roomId !== roomId));
    } catch (error) {
      console.error("채팅방 거절 실패:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>대기 중인 상담 채팅방 목록</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : chatRooms.length === 0 ? (
        <p>현재 대기 중인 채팅방이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {chatRooms.map((room) => (
            <li
              key={room.roomId}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <div>
                <strong>채팅방:</strong> {room.roomId} <br />
                <strong>생성 시간:</strong> {room.createdAt}
              </div>
              <div style={{ marginTop: "5px" }}>
                <button onClick={() => handleAccept(room.roomId)} style={{ marginRight: "5px" }}>
                  수락
                </button>
                <button onClick={() => handleReject(room.roomId)} style={{ marginRight: "5px" }}>
                  거절
                </button>
                <button onClick={() => handleRoomClick(room.roomId)}>
                  대기 (보기)
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatRoomList;
