import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiAxios from "../lib/apiAxios";

const RentalCarPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ 이전 페이지에서 전달된 예약 정보
  const {
    rentalCarNo,
    startDate,
    endDate,
    startTime,
    endTime,
    insuranceIncluded,
    totalPrice = 0,
    totalDays = 0,
    totalHours = 0,
  } = location.state || {};

  // ✅ 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    point: 0,
  });

  // ✅ 사용자 포인트 관련 상태
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [isInsufficient, setIsInsufficient] = useState(false);

  /** ✅ 사용자 정보 불러오기 */
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:9999/rental/user/info", {
          method: "GET",
          credentials: "include", // ✅ 쿠키 인증
        });
  
        const data = await response.json();
        console.log("✅ 사용자 정보asdd 응답 데이터:", data);  // 확인용 로그
  
        if (response.status === 401) {
          throw new Error("인증 실패: 로그인 필요");
        }
  
        setUserInfo({
          name: data.NAME || "정보 없음",
          email: data.EMAIL || "정보 없음",
          phone: data.PHONE || "정보 없음",
          point: data.POINT || 0,
        });
  
      } catch (error) {
        console.error("❌ 사용자 정보 불러오기 실패:", error);
      }
    };
  
    fetchUserInfo();
  }, []);
  

  /** ✅ 포인트 차감 후 남은 포인트 계산 */
  useEffect(() => {
    const updatedPoints = (userInfo.point || 0) - totalPrice;
    setRemainingPoints(updatedPoints);
    setIsInsufficient(updatedPoints < 0);
  }, [userInfo.point, totalPrice]);

  /** ✅ 결제 처리 */
  const handlePayment = async () => {
    if (isInsufficient) {
      alert("🚨 포인트가 부족합니다. 충전 페이지로 이동합니다.");
      navigate("/user/charge-points", { state: { returnPath: "/rental/payment" } });
      return;
    }

    const paymentData = {
      rentalCarNo,
      startDate,
      endDate,
      startTime,
      endTime,
      insuranceIncluded,
      totalPrice,
      paymentMethod: "POINT",
  };

    console.log("✅ 결제 데이터:", paymentData);

    try {
      const response = await apiAxios.post("/rental/payment", paymentData, { withCredentials: true });

      if (response.data.error) {
        alert("❌ 결제 실패: " + response.data.error);
        return;
      }

      alert(`✅ 결제 완료! 남은 포인트: ${(remainingPoints || 0).toLocaleString()} P`);
      navigate("/");
    } catch (error) {
      console.error("❌ 결제 오류:", error);
      alert("🚨 결제 중 오류 발생!");
    }
  };

  return (
    <div className="rental-payment">
      <h1>🚗 예약 정보 확인 및 결제</h1>

      {/* ✅ 사용자 정보 */}
      <div className="summary-box">
        <h2>👤 사용자 정보</h2>
        <p><strong>이름:</strong> {userInfo.name || "정보 없음"}</p>
        <p><strong>이메일:</strong> {userInfo.email || "정보 없음"}</p>
        <p><strong>전화번호:</strong> {userInfo.phone || "정보 없음"}</p>
        <p><strong>보유 포인트:</strong> {(userInfo.point || 0).toLocaleString()} P</p>
      </div>

      {/* ✅ 예약 정보 */}
      <div className="summary-box">
        <h2>📆 예약 정보</h2>
        <p><strong>차량 번호:</strong> {rentalCarNo}</p>
        <p><strong>대여 기간:</strong> 
          {startDate instanceof Date ? startDate.toISOString().split("T")[0] : startDate} ~ 
          {endDate instanceof Date ? endDate.toISOString().split("T")[0] : endDate}
        </p>
        <p><strong>시간:</strong> {startTime} ~ {endTime}</p>
        <p><strong>대여 기간:</strong> {totalDays}일 {totalHours}시간</p>
        <p><strong>보험 포함 여부:</strong> {insuranceIncluded ? "✅ 포함" : "❌ 미포함"}</p>
      </div>

      {/* ✅ 결제 정보 */}
      <div className="summary-box">
        <h2>💳 결제 정보</h2>
        <p>💰 <strong>총 결제 금액:</strong> {(totalPrice || 0).toLocaleString()} 원</p>
        <p>🔹 <strong>사용 가능 포인트:</strong> {(userInfo.point || 0).toLocaleString()} P</p>
        <p>
          🔻 <strong>결제 후 남을 포인트:</strong> {" "}
          <span style={{ color: isInsufficient ? "red" : "green" }}>
            {(remainingPoints || 0).toLocaleString()} P
          </span>
        </p>
      </div>

      {/* ✅ 포인트 부족 시 경고 */}
      {isInsufficient && <p style={{ color: "red", fontWeight: "bold" }}>🚨 포인트가 부족합니다.</p>}

      {/* ✅ 결제 버튼 */}
      <button onClick={handlePayment} disabled={isInsufficient} style={{ backgroundColor: isInsufficient ? "gray" : "#007BFF" }}>
        ✅ 결제하기
      </button>
    </div>
  );
};

export default RentalCarPayment;
