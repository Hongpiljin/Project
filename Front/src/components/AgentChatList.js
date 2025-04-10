import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState(""); // adminName 검색
  const [searchStatus, setSearchStatus] = useState(""); // 상태 필터
  const pageSize = 10;
  const navigate = useNavigate();
  const SERVER_URL = "http://localhost:9999";

  const { user } = useSelector((state) => state.auth);
  const isConsultant = user && (user.role === "admin" || user.role === "agent");

  const fetchChatRooms = async () => {
    try {
      setLoading(true);

      const params = {
        page: currentPage,
        size: pageSize,
      };

      if (searchKeyword.trim()) {
        params.adminName = searchKeyword.trim();
      }

      if (searchStatus.trim()) {
        params.status = searchStatus.trim();
      }

      const response = await axios.get(`${SERVER_URL}/chat/select`, { params });

      console.log("📦 채팅방 응답 데이터:", response.data);

      setChatRooms(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error("❌ 채팅방 목록 조회 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConsultant) {
      fetchChatRooms();
    }
  }, [isConsultant, currentPage, searchKeyword, searchStatus]);

  const handleRoomClick = (roomId) => {
    navigate(`/agent-chat?roomId=${roomId}`);
  };

  const handleAccept = async (roomId) => {
    try {
      await axios.post(`${SERVER_URL}/chat/accept`, null, {
        params: {
          roomId,
          consultantId: user.userNo,
          adminName: user.name,
        },
      });
      fetchChatRooms();
      navigate(`/agent-chat?roomId=${roomId}`);
    } catch (error) {
      console.error("❌ 채팅방 수락 실패:", error);
    }
  };

  const handleReject = async (roomId) => {
    try {
      await axios.post(`${SERVER_URL}/chat/reject`, null, {
        params: { roomId },
      });
      fetchChatRooms();
    } catch (error) {
      console.error("❌ 채팅방 거절 실패:", error);
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 0 && pageNum < totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(0); // 검색 시 첫 페이지로 초기화
  };

  const handleStatusChange = (e) => {
    setSearchStatus(e.target.value);
    setCurrentPage(0); // 상태 변경 시 첫 페이지로 초기화
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "처리 완료";
      case "waiting":
        return "대기 중";
      case "closed":
        return "종료됨";
      default:
        return "알 수 없음";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return { color: "green", fontWeight: "bold" };
      case "waiting":
        return { color: "orange", fontWeight: "bold" };
      case "closed":
        return { color: "gray", fontWeight: "bold" };
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!isConsultant ? (
        <div>접근 권한이 없습니다.</div>
      ) : (
        <>
          <h2>채팅방 목록</h2>

          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="관리자 이름 검색..."
              value={searchKeyword}
              onChange={handleSearchChange}
              style={{ padding: "5px", width: "200px" }}
            />
            <select
              value={searchStatus}
              onChange={handleStatusChange}
              style={{ padding: "5px" }}
            >
              <option value="">전체 상태</option>
              <option value="waiting">대기 중</option>
              <option value="active">처리 완료</option>
              <option value="closed">종료됨</option>
            </select>
          </div>

          {loading ? (
            <p>로딩 중...</p>
          ) : chatRooms.length === 0 ? (
            <p>조회된 채팅방이 없습니다.</p>
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
                    <strong>생성 시간:</strong> {formatDate(room.createdAt)} <br />
                    <strong>상태:</strong>{" "}
                    <span style={getStatusStyle(room.status)}>
                      {getStatusLabel(room.status)}
                    </span>
                    <br />
                    <strong>처리한 관리자:</strong> {room.adminName || "없음"} <br />
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

          <div style={{ marginTop: "20px" }}>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>
              이전
            </button>
            <span style={{ margin: "0 10px" }}>
              페이지 {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage + 1 === totalPages}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatRoomList;
