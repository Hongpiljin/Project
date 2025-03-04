import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/paymentSummary.module.css";

const ShoppingPaymentSummary = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    point: 0,
    address: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // ✅ 사용자 정보 불러오기
  useEffect(() => {
    fetch("http://localhost:9999/shopping/user/info", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setUserInfo({
          name: data.NAME || "정보 없음",
          email: data.EMAIL || "정보 없음",
          phone: data.PHONE || "정보 없음",
          point: data.POINT || 0,
          address: data.ADDRESS || "주소 없음",
        });
      })
      .catch((error) => console.error("❌ 사용자 정보 불러오기 실패:", error));
  }, []);

  // ✅ 장바구니 데이터 불러오기
  useEffect(() => {
    let storedPaymentItems = JSON.parse(localStorage.getItem("paymentItems") || "[]");

    // ✅ `paymentItems`가 비어 있으면 `cartItems`에서 가져오기
    if (storedPaymentItems.length === 0) {
      storedPaymentItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    }

    console.log("로컬스토리지에서 불러온 결제 데이터:", storedPaymentItems);

    const updatedCartItems = storedPaymentItems.map((item) => ({
      ...item,
      productAllPrice: item.productAllPrice || (item.productPrice * item.quantity || 0), // ✅ `quantity` 사용
    }));

    setCartItems(updatedCartItems);
    setTotalPrice(updatedCartItems.reduce((total, item) => total + item.productAllPrice, 0));
  }, []);

  // ✅ 포인트 차감 후 결제 금액 계산
  const finalPaymentAmount = Math.max(0, userInfo.point - totalPrice);

  // ✅ 최종 결제 함수
  const handleFinalPayment = async () => {
    try {
      const response = await fetch("http://localhost:9999/shopping/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(cartItems),
      });

      const result = await response.json();
      if (result.error) {
        alert(`❌ 결제 실패: ${result.error}`);
        return;
      }

      alert("✅ 결제가 완료되었습니다.");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("paymentItems");
      navigate("/mypage");
    } catch (error) {
      console.error("❌ 결제 오류:", error);
      alert("❌ 결제 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="payment-summary-container">
      <h1>주문/결제</h1>

      {/* ✅ 구매자 정보 */}
      <div className="summary-box">
        <h2>구매자 정보</h2>
        <p><strong>이름:</strong> {userInfo.name}</p>
        <p><strong>이메일:</strong> {userInfo.email}</p>
        <p><strong>휴대폰 번호:</strong> {userInfo.phone}</p>
        <p><strong>주소:</strong> {userInfo.address}</p>
      </div>

      {/* ✅ 장바구니 정보 */}
      <div className="summary-box">
        <h2>장바구니 내역</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={`${item.productId}-${item.productColor}-${index}`} className="cart-item">
              <p><strong>{item.productName}</strong> - {item.productAllPrice.toLocaleString()}원 × {item.quantity}개</p>
              <p><strong>색상:</strong> {item.productColor}</p>
            </div>
          ))
        ) : (
          <p>장바구니가 비어 있습니다.</p>
        )}
      </div>

      {/* ✅ 결제 정보 */}
      <div className="summary-box">
        <h2>결제 정보</h2>
        <p><strong>사용 가능한 포인트:</strong> {userInfo.point.toLocaleString()}원</p>
        <p><strong>총 상품 가격:</strong> {totalPrice.toLocaleString()}원</p>
        <p><strong>결제 후 남는 포인트:</strong> {finalPaymentAmount.toLocaleString()}원</p>
      </div>

      {/* ✅ 결제 버튼 */}
      <button onClick={handleFinalPayment} className="payment-button">결제하기</button>
    </div>
  );
};

export default ShoppingPaymentSummary;
