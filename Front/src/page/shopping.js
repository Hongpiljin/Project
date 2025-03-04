import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/shopping.css";
import { useNavigate } from "react-router-dom";

const Shopping = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [data, setData] = useState([]); // 상품 데이터
  const [imageData, setImageData] = useState({}); // Base64 이미지 데이터 저장
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ 페이징 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // ✅ 한 페이지당 16개씩 표시

  // ✅ 카테고리 데이터 유지
  const categories = {
    대분류: ["국산차 용품", "수입차 용품", "실내용품", "레이싱/튜닝"],
    중분류: {
      "국산차 용품": ["현대차", "기아자동차", "제네시스", "쉐보레", "르노삼성", "쌍용자동차"],
      "수입차 용품": ["벤츠", "BMW", "아우디", "폭스바겐", "포드", "도요타", "혼다", "닛산"],
      "실내용품": ["매트", "시트커버", "핸들커버", "방향제", "청소용품"],
      "레이싱/튜닝": ["스포일러", "바디킷", "서스펜션", "브레이크", "엔진튜닝"],
    },
    소분류: {
      현대차: ["아반떼", "소나타", "그랜저", "싼타페", "투싼"],
      기아자동차: ["모닝", "K3", "K5", "K7", "스포티지", "쏘렌토"],
      제네시스: ["G70", "G80", "G90"],
      쉐보레: ["스파크", "말리부", "트랙스", "이쿼녹스"],
      벤츠: ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC"],
      BMW: ["1시리즈", "3시리즈", "5시리즈", "7시리즈", "X1", "X3", "X5"],
      아우디: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7"],
    },
  };

  // ✅ 상품 데이터 가져오기 (서버 페이징 적용)
  const fetchData = async () => {
    try {
      const params = {
        categoryMain: selectedCategory?.trim(),
        categorySub: selectedSubcategory?.trim(),
        categoryDetail: selectedDetail?.trim(),
        page: currentPage, // ✅ 현재 페이지 정보 전달
        limit: itemsPerPage, // ✅ 서버에서 16개만 가져오기
      };

      const response = await axios.get("http://localhost:9999/shopping", { params });
      console.log("✅ 현재 페이지 API 응답 데이터 개수:", response.data.length);
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("데이터를 불러오는 데 실패했습니다.");
    }
  };

  // ✅ 개별 상품 이미지 가져오기 (현재 페이지의 상품만 요청)
  const fetchProductImage = async (productId) => {
    if (imageData[productId]) return; // ✅ 이미 로딩된 이미지면 요청하지 않음
    try {
      const response = await axios.get(`http://localhost:9999/shopping/product/${productId}/getImage`);
      setImageData((prev) => ({
        ...prev,
        [productId]: `data:image/jpeg;base64,${response.data}`,
      }));
    } catch (error) {
      console.error(`Error fetching image for product ${productId}:`, error);
    }
  };

  // ✅ 데이터가 변경될 때 새로 가져오기
  useEffect(() => {
    fetchData();
  }, [selectedCategory, selectedSubcategory, selectedDetail, currentPage]);

  // ✅ 현재 페이지의 상품들에 대해서만 이미지 요청
  useEffect(() => {
    data.forEach((item) => fetchProductImage(item.productId));
  }, [data]);

  return (
    <div className="shopping-page">
      <header className="header">
        <h1>카자몰</h1>
      </header>

      <div className="content">
        <aside className="categories">
          <section className="category-section">
            <h2>대분류</h2>
            {categories.대분류.map((category, index) => (
              <button
                key={index}
                className={`category-button ${selectedCategory === category ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSubcategory(null);
                  setSelectedDetail(null);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </section>

          {selectedCategory && (
            <section className="subcategory-section">
              <h2>중분류</h2>
              {categories.중분류[selectedCategory]?.map((subcategory, index) => (
                <button
                  key={index}
                  className={`category-button ${selectedSubcategory === subcategory ? "active" : ""}`}
                  onClick={() => {
                    setSelectedSubcategory(subcategory);
                    setSelectedDetail(null);
                    setCurrentPage(1);
                  }}
                >
                  {subcategory}
                </button>
              ))}
            </section>
          )}

          {selectedSubcategory && categories.소분류[selectedSubcategory] && (
            <section className="subcategory-detail-section">
              <h2>소분류</h2>
              {categories.소분류[selectedSubcategory]?.map((detail, index) => (
                <button
                  key={index}
                  className={`category-button ${selectedDetail === detail ? "active" : ""}`}
                  onClick={() => {
                    setSelectedDetail(detail);
                    setCurrentPage(1);
                  }}
                >
                  {detail}
                </button>
              ))}
            </section>
          )}
        </aside>

        <main className="main-content">
          <h2>상품 리스트</h2>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="product-grid">
              {data.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="product-card" onClick={() => navigate(`/shopping/product/${item.productId}`)}>
                  <div className="product-image">
                    {imageData[item.productId] ? (
                      <img src={imageData[item.productId]} alt={item.productName} />
                    ) : (
                      <span>이미지 없음</span>
                    )}
                  </div>
                  <div className="product-info">
                    <p className="product-name">{item.productName}</p>
                    <p className="product-price">{item.productPrice ? item.productPrice.toLocaleString() + "원" : "가격 정보 없음"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ✅ 페이징 버튼 */}
          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              이전
            </button>
            <span> {currentPage} 페이지 </span>
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              다음
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shopping;
