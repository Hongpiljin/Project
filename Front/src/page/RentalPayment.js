import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiAxios from "../lib/apiAxios";

const RentalPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservationId, rentalCarNo, totalPrice } = location.state || {};

  const handlePayment = async () => {
    if (!reservationId || !rentalCarNo || !totalPrice) {
      alert("🚨 결제할 예약 정보가 없습니다.");
      return;
    }

    const paymentData = {
      reservationId,
      rentalCarNo,
      totalPrice,
      paymentMethod: "POINT",
    };

    try {
      const response = await apiAxios.post("http://localhost:9999/rental/payment", paymentData);
      alert("✅ 결제 성공! 결제 번호: " + response.data.paymentId);
      navigate("/rental/success", { state: { paymentId: response.data.paymentId } });
    } catch (error) {
      alert("🚨 결제 실패: 서버 오류 발생");
    }
  };

  return (
    <div>
      <h1>💳 렌트카 결제</h1>
      <p>💰 총 금액: {totalPrice.toLocaleString()} 원</p>
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
};

export default RentalPayment;
