import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/CarPaymentdetail.css"; // (CSS 파일 임포트)
//import "../css/UsedCarDetail.css";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const DEFAULT_IMAGE_URL = "/images/usedcar_imageX.png";

// 이미지 URL 처리 함수
const getImageSrc = (image) => {
  if (!image || image.length === 0) return DEFAULT_IMAGE_URL;
  if (image.startsWith("data:image")) return image; // data URL 형식
  if (image.startsWith("/images")) return `${SERVER_URL}${image}`; // 서버 내 이미지
  if (image.startsWith("http")) return image;       // http로 시작
  // 그 외 Base64
  return `data:image/png;base64,${image}`;
};

const CarPaymentdetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carDetails } = location.state || {};

  const [userInfo, setUserInfo] = useState(null);
  const [userPoint, setUserPoint] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. 사용자 정보 조회
  useEffect(() => {
    fetch(`http://localhost:9999/used-cars/user/info`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("사용자 정보 조회 실패");
        }
        return res.json();
      })
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("사용자 정보 조회 오류:", error);
        setError("사용자 정보를 불러올 수 없습니다.");
        setLoading(false);
      });
  }, []);

  // 2. 사용자 포인트 조회
  useEffect(() => {
    if (!userInfo || !userInfo.userId) return;
    console.log(userInfo)
    fetch(`http://localhost:9999/used-cars/point?userId=${userInfo.userId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("포인트 조회 실패");
        }
        return res.json();
      })
      .then((data) => {
        setUserPoint(data.userPoint);
      })
      .catch((error) => {
        console.error("포인트 조회 오류:", error);
      });
  }, [userInfo]);

  if (!carDetails) {
    return (
      <div>
        <p>차량 정보를 불러올 수 없습니다.</p>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    );
  }

  // 결제 버튼
  const handleProceedToPayment = () => {
    if (!userInfo) {
      alert("로그인 후 결제해주세요");
      navigate("/login");
      return;
    }
    navigate("/CarPayment", { state: { carDetails } });
  };

  // 메인 이미지 URL
  const mainImageUrl = getImageSrc(carDetails.mainImage);

  return (
    <div className="car-payment-detail">
      <h1>차량 상세정보 확인</h1>

      {/* 2열 레이아웃 */}
      <div className="car-payment-top">
        {/* 왼쪽 열 */}
        <div className="car-payment-left">
        <div className="car-info">
        <div className="car-info">
  <img src={mainImageUrl} alt="차량 대표" />
  <p>
    <strong>차량명:</strong> {carDetails.name}
  </p>
  <p>
    <strong>연식:</strong> {carDetails.year}
  </p>
  <p>
    <strong>주행거리:</strong> {carDetails.mileage}
  </p>
  <p>
    <strong>연료:</strong> {carDetails.fuelType}
  </p>
  <p>
    <strong>차량번호:</strong> {carDetails.vehicleNo}
  </p>
  <p>
    <strong>색상:</strong> {carDetails.color || "정보 없음"}
  </p>
  <p>
    <strong>인승:</strong> {carDetails.seatingCapacity || "정보 없음"}
  </p>
  <p>
    <strong>차종:</strong> {carDetails.vehicleType || "정보 없음"}
  </p>
  <p>
    <strong>변속기:</strong> {carDetails.transmission || "정보 없음"}
  </p>
  <p>
    <strong>구동방식:</strong> {carDetails.driveType || "정보 없음"}
  </p>
  <p>
    <strong>판매점:</strong> {carDetails.dealerLocation || "정보 없음"}
  </p>
  <p>
    <strong>차량 번호:</strong> {carDetails.vehiclePlate || "정보 없음"}
  </p>
</div>
</div>

<div className="buyer-info">
  <h2>구매자 정보 및 보유 포인트</h2>
  {loading ? (
    <p>구매자 정보를 불러오는 중...</p>
  ) : error ? (
    <p>{error}</p>
  ) : userInfo ? (
    <>
      <p>
        <strong>구매자 이름:</strong> {userInfo.name || "정보 없음"}
      </p>
      <p>
        <strong>구매자 이메일:</strong> {userInfo.email || "정보 없음"}
      </p>
      <p>
        <strong>구매자 전화번호:</strong> {userInfo.phone || "정보 없음"}
      </p>
      <p>
        <strong>구매자 ID:</strong> {userInfo.userId || "정보 없음"}
      </p>
      <p>
  <strong>배송받으실 주소:</strong>{" "}
  {(userInfo.address !== undefined && userInfo.address !== null)
    ? `${userInfo.address} ${userInfo.addressDetail || ""}`.trim()
    : "정보 없음"}
</p>
      <p>
        <strong>보유 포인트:</strong>{" "}
        {userInfo.point !== undefined
          ? userInfo.point.toLocaleString()
          : "정보 없음"}원
      </p>
    </>
  ) : (
    <p>구매자 정보를 불러올 수 없습니다.</p>
  )}
</div>
        </div>

        {/* 오른쪽 열 */}
        <div className="car-payment-right">
          <div className="purchase-cost">
            <h3>총 예상 구매비용</h3>
            <ul>
              <li>
                <strong>차량가:</strong>{" "}
                {carDetails.purchaseDetails.vehiclePrice.toLocaleString()}원
              </li>
              <li>
                <strong>이전등록비:</strong>{" "}
                {carDetails.purchaseDetails.transferTax.toLocaleString()}원
              </li>
              <li>
                <strong>관리비용:</strong>{" "}
                {carDetails.purchaseDetails.managementFee.toLocaleString()}원
              </li>
              <li>
                <strong>등록신청대행수수료:</strong>{" "}
                {carDetails.purchaseDetails.registrationFee.toLocaleString()}원
              </li>
              <li>
                <strong>K Car Warranty 가입비:</strong>{" "}
                {carDetails.purchaseDetails.warrantyFee.toLocaleString()}원
              </li>
              <li>
                <strong>성능책임보험료:</strong>{" "}
                {carDetails.purchaseDetails.performanceInsurance.toLocaleString()}
                원
              </li>
              <li>
                <strong>배송비:</strong> {carDetails.purchaseDetails.deliveryFee}
              </li>
            </ul>
            <div className="total-price">
              합계: {carDetails.totalPrice.toLocaleString()}원
            </div>
          </div>

          <button onClick={handleProceedToPayment}>결제하기</button>
        </div>
      </div>
    </div>
  );
};

export default CarPaymentdetail;
