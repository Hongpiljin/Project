import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/usedCarPayment.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const DEFAULT_IMAGE_URL = "/images/usedcar_imageX.png";

// 이미지 URL 처리 함수
const getImageSrc = (image) => {
  if (!image || image.length === 0) return DEFAULT_IMAGE_URL;
  if (image.startsWith("data:image")) return image;
  if (image.startsWith("/images")) return `${SERVER_URL}${image}`;
  if (image.startsWith("http")) return image;
  return `data:image/png;base64,${image}`;
};

function CarPayment() {
  const navigate = useNavigate();
  const { carDetails } = useLocation().state || {};

  // 차량 번호 및 결제 금액
  const vehicleNo = carDetails?.vehicleNo ?? null;
  const totalPrice = carDetails?.totalPrice || carDetails?.price || 0;

  // 사용자 정보 상태
  const [userPoint, setUserPoint] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const mainImageUrl = getImageSrc(carDetails?.mainImage);

  // 1) 사용자 정보 조회
  useEffect(() => {
    fetch(`http://localhost:9999/used-cars/user/info`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("사용자 정보 조회 실패");
        return res.json();
      })
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("사용자 정보 조회 오류:", error);
      });
  }, []);

  // 2) 사용자 포인트 조회
  useEffect(() => {
    if (!userInfo) return;
    const userId = userInfo.userId;
    fetch(`http://localhost:9999/used-cars/point?userId=${userId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("포인트 조회 실패");
        return res.json();
      })
      .then((data) => {
        setUserPoint(data.userPoint);
      })
      .catch((error) => {
        console.error("포인트 조회 오류:", error);
      });
  }, [userInfo]);

  // 결제 버튼 클릭 시 추가 확인 절차 수행
  const handleProceedToPayment = async () => {
    if (!userInfo) {
      alert("로그인 후 결제해주세요");
      navigate("/login");
      return;
    }
    if (!vehicleNo) {
      alert("🚨 차량 번호가 없습니다.");
      return;
    }
    if (userPoint < totalPrice) {
      alert("포인트가 부족합니다. 포인트 충전 후 결제를 진행하세요.");
      return;
    }

    // 1) 구매 확인
    if (!window.confirm("정말 구매하시겠습니까?")) {
      return;
    }

    // 2) 8자리 랜덤 인증번호 생성
    const randomCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    const userInput = window.prompt(`아래의 8자리 숫자를 입력해 주세요:\n${randomCode}`);
    if (userInput !== randomCode) {
      alert("인증번호가 일치하지 않습니다. 결제를 취소합니다.");
      return;
    }

    // 모든 조건 만족 시 결제 처리
    handlePayment();
  };

  // 실제 결제 처리 함수
  const handlePayment = async () => {
    setLoading(true);
    const paymentData = {
      vehicleNo: vehicleNo,
      point: totalPrice,
    };

    try {
      const response = await fetch("http://localhost:9999/used-cars/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) throw new Error("결제 실패");
      alert("포인트 결제가 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("결제 오류:", error);
      alert("결제 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!carDetails) {
    return (
      <div className="used-car-payment-detail">
        차량 정보를 받아오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="used-car-payment-container">
      <h1 className="used-car-payment-title">주문/결제</h1>

      {/* 상단 섹션: 구매자, 배송지, 결제정보 */}
      <div className="used-car-payment-top">
        <div className="used-car-payment-section">
          <h2>구매자 정보</h2>
          {userInfo ? (
            <div className="used-car-payment-info-grid">
              <div>이름</div>
              <div>{userInfo.name || "정보 없음"}</div>
              <div>이메일</div>
              <div>{userInfo.email || "정보 없음"}</div>
              <div>전화번호</div>
              <div>{userInfo.phone || "정보 없음"}</div>
              <div>ID</div>
              <div>{userInfo.userId || "정보 없음"}</div>
            </div>
          ) : (
            <p>구매자 정보를 불러오는 중...</p>
          )}
        </div>

        <div className="used-car-payment-section">
          <h2>배송지 정보</h2>
          {userInfo ? (
            <div className="used-car-payment-info-grid">
              <div>받는 분</div>
              <div>{userInfo.name || "정보 없음"}</div>
              <div>연락처</div>
              <div>{userInfo.phone || "정보 없음"}</div>
              <div>주소</div>
              <div>
                {userInfo.address
                  ? `${userInfo.address} ${userInfo.addressDetail || ""}`.trim()
                  : "정보 없음"}
              </div>
            </div>
          ) : (
            <p>배송지 정보를 불러오는 중...</p>
          )}
        </div>

        <div className="used-car-payment-section">
          <h2>결제 정보</h2>
          <div className="used-car-payment-info-grid">
            <div>총 결제 금액</div>
            <div>{totalPrice.toLocaleString()}원</div>
            <div>보유 포인트</div>
            <div>{userPoint.toLocaleString()}원</div>
          </div>
        </div>
      </div>

      {/* 하단 섹션: 차량 이미지 및 상세 정보 */}
      <div className="used-car-payment-section">
        <h2>차량 정보</h2>
        <img
          src={mainImageUrl}
          alt="차량 대표"
          className="used-car-payment-image"
        />
        <ul className="used-car-payment-car-details">
          <li>
            <strong>차량번호:</strong> {vehicleNo || "🚨 없음"}
          </li>
          <li>
            <strong>차량명:</strong> {carDetails.name || "차량 이름"}
          </li>
          <li>
            <strong>브랜드:</strong> {carDetails.brand || "정보 없음"}
          </li>
          <li>
            <strong>연식:</strong> {carDetails.year || "정보 없음"}
          </li>
          <li>
            <strong>가격:</strong>{" "}
            {carDetails.purchaseDetails.vehiclePrice
              ? `₩${carDetails.purchaseDetails.vehiclePrice.toLocaleString()}`
              : "정보 없음"}
          </li>
          <li>
            <strong>주행거리:</strong> {carDetails.mileage || "정보 없음"}
          </li>
          <li>
            <strong>인승:</strong>{" "}
            {carDetails.seatingCapacity
              ? `${carDetails.seatingCapacity}인승`
              : "정보 없음"}
          </li>
          <li>
            <strong>차종:</strong> {carDetails.vehicleType || "정보 없음"}
          </li>
          <li>
            <strong>변속기:</strong> {carDetails.transmission || "정보 없음"}
          </li>
          <li>
            <strong>구동방식:</strong> {carDetails.driveType || "정보 없음"}
          </li>
          <li>
            <strong>연료:</strong> {carDetails.fuelType || "정보 없음"}
          </li>
          <li>
            <strong>판매점:</strong> {carDetails.dealerLocation || "정보 없음"}
          </li>
          <li>
            <strong>차량 번호:</strong> {carDetails.vehiclePlate || "정보 없음"}
          </li>
        </ul>
      </div>

      <button
        className="used-car-payment-button"
        onClick={handleProceedToPayment}
        disabled={loading}
      >
        {loading ? "결제 진행 중..." : "결제하기"}
      </button>
    </div>
  );
}

export default CarPayment;
