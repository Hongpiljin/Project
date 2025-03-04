import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import apiAxios from "../lib/apiAxios";
import { logout } from "../store/authSlice";
import "../css/productDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // ✅ 상품 정보 상태
  const [product, setProduct] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [productImage, setProductImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ✅ 리뷰 관련 상태
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [successMessage, setSuccessMessage] = useState("");
  
  // ✅ 리뷰 수정 관련 상태 추가
  const [editingReview, setEditingReview] = useState(null);
const [editContent, setEditContent] = useState("");

// ✅ 상품 및 리뷰 데이터 가져오기
useEffect(() => {
  const fetchProductDetails = async () => {
      try {
        const response = await apiAxios.get(`/shopping/product/${productId}/details`);
        if (response.data.length > 0) {
          setProduct(response.data[0]);
          setProductDetails(response.data);
          
          const uniqueColors = [...new Set(response.data.map((detail) => detail.productColor))];
          if (uniqueColors.length > 0) {
            setSelectedColor(uniqueColors[0]);
          }
        }
        
        const imageResponse = await apiAxios.get(`/shopping/product/${productId}/getImage`);
        setProductImage(`data:image/jpeg;base64,${imageResponse.data}`);
      } catch (error) {
        setError("상품 정보를 불러오는 데 실패했습니다.");
      }
    };
    fetchProductDetails();
    fetchReviews();
  }, [productId]);


    // ✅ 리뷰 수정 시작
const handleEditReview = (review) => {
  setEditingReview(review.id);
  setEditContent(review.content);
};

// ✅ 리뷰 삭제 기능 (reviewNo 사용)
const handleDeleteReview = (reviewNo) => {
  apiAxios.delete(`/shopping/review/${reviewNo}`)
    .then(() => {
      setReviews(reviews.filter(review => review.reviewNo !== reviewNo));

      // ✅ localStorage에서도 삭제
      const storedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      const updatedReviews = storedReviews.filter(review => review.reviewNo !== reviewNo);
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    })
    .catch(error => console.error("리뷰 삭제 중 오류 발생", error));
};

// ✅ 리뷰 수정 완료
const handleUpdateReview = (reviewId) => {
  apiAxios.put(`/api/reviews/${reviewId}`, { content: editContent })
    .then(() => {
      setReviews(reviews.map(review => review.id === reviewId ? { ...review, content: editContent } : review));
      setEditingReview(null);

      // ✅ localStorage 업데이트 (만약 localStorage에 저장 중이라면)
      const storedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      const updatedReviews = storedReviews.map(review => 
        review.id === reviewId ? { ...review, content: editContent } : review
      );
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    })
    .catch(error => console.error("리뷰 수정 중 오류 발생", error));
};

    const fetchReviews = async () => {
      try {
        const response = await apiAxios.get(`/shopping/product/${productId}`);
        setReviews(response.data);
      } catch (error) {
        setError("리뷰 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    

  // ✅ 장바구니 추가 함수
  const handleAddToCart = () => {
    if (!product) return;

    // ✅ 기존 장바구니 가져오기
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // ✅ 장바구니에 동일한 상품이 있는지 확인
    const existingItemIndex = existingCart.findIndex(
      (item) => item.productId === product.productId && item.productColor === selectedColor
    );

    let updatedCart;
    if (existingItemIndex > -1) {
      // ✅ 이미 존재하는 상품이면 수량 증가
      updatedCart = existingCart.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      // ✅ 새로운 상품 추가
      updatedCart = [
        ...existingCart,
        {
          productId: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          productColor: selectedColor,
          quantity: quantity,
          productImage: productImage,
        },
      ];
    }

    // ✅ localStorage에 저장
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("장바구니에 상품이 추가되었습니다!");
  };

  // ✅ 리뷰 추가 함수
  const handleAddReview = async () => {
    if (!isAuthenticated) {
      alert("리뷰를 작성하려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (!newReview.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await apiAxios.post(`/shopping/product/${productId}/review`, {
        content: newReview,
        evaluation: newRating,
      });

      if (response.data.code === 1) {
        setSuccessMessage("리뷰가 성공적으로 추가되었습니다.");
        setReviews([...reviews, {
          userId: "현재 사용자",
          content: newReview,
          evaluation: newRating,
          createdDate: new Date().toISOString(),
        }]);
        setNewReview("");
        setNewRating(5);

        window.location.reload();
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError("인증이 만료되었습니다. 다시 로그인해주세요.");
        dispatch(logout());
        navigate("/login");
      } else {
        setError("리뷰 추가 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) return <p className="loading-message">로딩 중...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="product-detail-page">
      {/* ✅ 상품 정보 */}
      {product && (
        <div className="product-info">
          <h2>{product.productName || "상품명 없음"}</h2>
          <p>가격: {product.productPrice?.toLocaleString()}원</p>
          {productImage ? (
            <img src={productImage} alt={product.productName} className="product-image" />
          ) : (
            <span>이미지 없음</span>
          )}
        </div>
      )}

      {/* ✅ 장바구니 & 결제 */}
      <div className="cart-buttons">
        <button className="add-to-cart" onClick={handleAddToCart}>장바구니 담기</button>
        <button className="checkout" onClick={() => navigate("/shopping/payment-summary")}>즉시 결제</button>
      </div>

     {/* ✅ 리뷰 목록 */}
     <div className="review-section">
        <h2>리뷰</h2>
        {reviews.length > 0 ? (
          <ul className="review-list">
            {reviews.map((review, index) => (
              <li key={index} className="review-item">
                <p><strong>작성자: {review.userId || "익명"}</strong></p>
                
                {editingReview === review.id ? (
                  <>
                    <input 
                      type="text" 
                      value={editContent} 
                      onChange={(e) => setEditContent(e.target.value)} 
                    />
                    <button onClick={() => handleUpdateReview(review.id)}>수정 완료</button>
                    <button onClick={() => setEditingReview(null)}>취소</button>
                  </>
                ) : (
                  <>
                    <p>{review.content}</p>
                    <p className="rating">평점: {review.evaluation}점</p>
                    <button onClick={() => handleEditReview(review)}>수정</button>
                    <button onClick={() => handleDeleteReview(review.reviewNo)}>삭제</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-reviews">아직 등록된 리뷰가 없습니다.</p>
        )}

        {/* ✅ 리뷰 작성 폼 */}
        <div className="add-review">
          <h3>리뷰 작성하기</h3>

          {/* ✅ 평점 선택 UI 추가 */}
          <div className="rating-section">
            <h4>평점 선택</h4>
            <select value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value, 10))}>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>{rating}점</option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="리뷰 내용을 입력하세요."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button onClick={handleAddReview}>리뷰 추가</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
