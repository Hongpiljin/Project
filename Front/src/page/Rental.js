import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiAxios from "../lib/apiAxios";

const Rental = () => {
  const [data, setData] = useState([]); // 렌트카 목록
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ 페이징 관련 추가 코드
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  /** ✅ 렌트카 목록 불러오기 (GET /rental/list) */
  const fetchRentalCars = async () => {
    try {
      const response = await apiAxios.get("http://localhost:9999/rental/list");
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error("❌ 렌트카 전체 조회 실패:", error);
      setError("렌트카 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    fetchRentalCars();
  }, []);

  return (
    <div className="rental-page">


      <main className="main-content">
        <h2>🚗 렌트카 리스트</h2>
        {error ? (
          <p className="error-message">{error}</p>
        ) : paginatedData.length > 0 ? (
          <div className="car-grid">
            {paginatedData.map((car) => (
              <div key={car.rentalCarNo} className="car-card" onClick={() => navigate(`/rental/list/${car.rentalCarNo}`)}>
                <div className="car-image">{car.carImage ? <img src={car.carImage} alt={car.model} /> : <span>이미지 없음</span>}</div>
                <div className="car-info">
                  <p className="car-name">🚘 {car.model}</p>
                  <p className="car-type">🛠 차량 종류: {car.type}</p>
                  <p className="car-location">📍 위치: {car.location}</p>
                  <p className="car-fuel">⛽ 연료: {car.fuel}</p>
                  <p className="car-transmission">⚙ 변속기: {car.transmission}</p>
                  <p className="car-status">
                    🚗 상태: {car.status === 0 ? "✔️ 대여 가능" : "❌ 대여 불가"}
                  </p>
                  <p className="car-price">💰 1일 요금: {car.pricePerDay.toLocaleString()} 원</p>
                  <p className="car-hourly-price">⏳ 시간당 요금: {car.hourlyPrice.toLocaleString()} 원</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>🚨 선택한 조건에 맞는 차량이 없습니다.</p>
        )}

        {/* ✅ 페이지네이션 UI 추가 */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
              {page}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Rental;
