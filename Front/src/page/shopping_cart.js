import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // ✅ 로그인하지 않은 사용자는 장바구니 접근 차단
  useEffect(() => {
    if (!isAuthenticated) {
      alert("장바구니를 보려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // ✅ 로컬 스토리지에서 장바구니 데이터 불러오기
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]").map((item) => ({
      ...item,
      productName: item.productName || "알 수 없음",
      productPrice: Number(item.productPrice) || 0,
      quantity: Number(item.quantity) || 1,
      productImage: item.productImage?.startsWith("data:image/") 
        ? item.productImage.replace(/^data:image\/\w+;base64,/, "") // ✅ Base64 프리픽스 제거
        : item.productImage
    }));

    console.log("불러온 장바구니 데이터:", storedCartItems);
    setCartItems(storedCartItems);
  }, [isAuthenticated, navigate]);

  // ✅ 장바구니에서 상품 삭제
  const removeItem = (productId, productColor) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.productId === productId && item.productColor === productColor)
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // ✅ 수량 증가 함수
  const increaseQuantity = (productId, productColor) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId && item.productColor === productColor
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // ✅ 수량 감소 함수 (0 이하로 내려가지 않음)
  const decreaseQuantity = (productId, productColor) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId && item.productColor === productColor
        ? { ...item, quantity: Math.max(1, item.quantity - 1) } // 최소 1 유지
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // ✅ 결제 내역 페이지로 이동
  const handleGoToPaymentSummary = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
  
    // ✅ 결제 페이지로 보낼 때 Base64 프리픽스 제거
    const cleanedCartItems = cartItems.map(item => ({
      ...item,
      productImageBase64: item.productImage?.replace(/^data:image\/\w+;base64,/, ""),
    }));
  
    localStorage.setItem("cartItems", JSON.stringify(cleanedCartItems));
    navigate("/shopping/payment-summary");
  };
  

  return (
    <div className="cart-container">
      <h1>장바구니</h1>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={`${item.productId}-${item.productColor}`} className="cart-item">
            {item.productImage ? (
              <img 
                src={`data:image/jpeg;base64,${item.productImage}`} 
                alt={item.productName} 
                className="cart-item-image" 
              />
            ) : (
              <span className="no-image">이미지 없음</span>
            )}

            <div className="cart-item-info">
              <strong>{item.productName}</strong>
              <p>가격: {item.productPrice.toLocaleString()}원</p>
              <p>색상: {item.productColor}</p>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.productId, item.productColor)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.productId, item.productColor)}>+</button>
              </div>

              <button className="remove-item" onClick={() => removeItem(item.productId, item.productColor)}>
                삭제
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>장바구니에 상품이 없습니다.</p>
      )}

      {cartItems.length > 0 && (
        <div className="total-price">
          <h3>총 금액: {cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0).toLocaleString()}원</h3>
          <button onClick={() => navigate("/shopping")}>쇼핑 계속하기</button>
          <button className="checkout" onClick={handleGoToPaymentSummary}>결제하기</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
