import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/UsedCar.css";
import Chatbot from "../components/Chatbot";
import { useNavigate } from "react-router-dom";
import UsedCarFilter from "../components/UsedCarFilter";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const DEFAULT_IMAGE_URL = `${SERVER_URL}/images/usedcar_imageX.png`;
const MAIN_BANNER_IMAGE = `${SERVER_URL}/images/UsedCarBanner.png`;

const UsedCarBoard = () => {
  const [cars, setCars] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // 전체 차량 수
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // 한 페이지에 20개씩 표시
  
  const navigate = useNavigate();

  // 필터 상태
  const [filters, setFilters] = useState({
    vehicleName: "",
    brand: "",
    modelYear: "",
    minKm: "",
    maxKm: "",
    priceRange: "",
    minPrice: "",
    maxPrice: "",
    vehicleType: "",
    fuelType: "",
    driveType: "",
    dealerLocation: "",
    color: "",
    seatingCapacity: "",
    transmission: "",
    sortBy: "car_km",
    order: "asc",
  });

  //  정렬 옵션
  const sortOptions = [
    { label: "전체 보기", value: "default" },
    { label: "적은 주행거리 순", value: "car_km_asc" },
    { label: "많은 주행거리 순", value: "car_km_desc" },
    { label: "낮은 가격 순", value: "price_asc" },
    { label: "높은 가격 순", value: "price_desc" },
    { label: "최근 연식 순", value: "model_year_desc" },
    { label: "오래된 연식 순", value: "model_year_asc" },
  ];

  // 백엔드에서 받아온 차량 데이터를 기준으로, 항상 itemsPerPage(20)개가 되도록 dummy 항목 추가
  const adjustedCars = [...cars];
  while (adjustedCars.length < itemsPerPage) {
    adjustedCars.push({ vehicleNo: `dummy-${adjustedCars.length}`, isDummy: true });
  }

  //  정렬 변경 핸들러
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "default") {
      setFilters((prev) => ({
        ...prev,
        sortBy: "car_km",
        order: "asc",
      }));
      return;
    }
    const parts = selectedValue.split("_");
    let sortBy, order;
    if (parts.length === 3) {
      sortBy = parts[0] + "_" + parts[1];
      order = parts[2];
    } else if (parts.length === 2) {
      sortBy = parts[0];
      order = parts[1];
    } else {
      console.error("정렬 값 형식 오류:", selectedValue);
      return;
    }
    if (!["asc", "desc"].includes(order)) {
      console.error("잘못된 정렬 order 값:", order);
      return;
    }
    setFilters((prev) => ({
      ...prev,
      sortBy,
      order,
    }));
  };

  // 차량 데이터 불러오기 (페이징 적용)
  const fetchCars = (filterParams, page) => {
    axios
      .get(`${SERVER_URL}/used-cars/getFilteredUsedCars`, {
        params: {
          ...filterParams,
          vehicleName: filterParams.vehicleName || "",
          page: page,
          itemsPerPage: itemsPerPage,
        },
      })
      .then((response) => {
        console.log("response.data : ", response.data);
        setCars(response.data.cars);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => console.error("Failed to fetch used cars:", error));
  };

  // 필터 변경 시 페이지 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
    fetchCars(filters, 1);
  }, [filters]);

  // currentPage 변경 시 데이터 조회
  useEffect(() => {
    fetchCars(filters, currentPage);
  }, [currentPage]);

  // 이미지 URL 변환
  const getImageSrc = (car) => {
    if (!car.mainImage || car.mainImage.length === 0) return DEFAULT_IMAGE_URL;
    if (car.mainImage.startsWith("/images"))
      return `${SERVER_URL}${car.mainImage}`;
    return `data:image/png;base64,${car.mainImage}`;
  };

  const handleCardClick = (vehicleNo) =>
    navigate(`/used-cars/detail/${vehicleNo}`);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="used-car-board">
      {/* 메인 배너 */}
      <div className="main-banner">
        {/* 필요 시 배너 내용 추가 */}
      </div>

      {/* 헤더 (검색창, 차량 대수, 정렬 기준) */}
      <header className="used-car-board-header">
        <h1>중고차 목록</h1>
        <div className="used-car-header">
          {/* 검색창 */}
          <input
            type="text"
            placeholder="차량명을 입력하세요..."
            value={filters.vehicleName}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, vehicleName: e.target.value }))
            }
            className="search-input"
          />
          {/* 검색 버튼 */}
          <button onClick={() => fetchCars(filters, 1)} className="search-button">
            검색
          </button>
          {/* 정렬 기준 드롭다운 */}
          <div className="sort-container">
            <select
              id="sortSelect"
              onChange={handleSortChange}
              value={`${filters.sortBy}_${filters.order}`}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 총 차량 대수 */}
        <p className="car-count">
          총 <span>{totalCount.toLocaleString()}</span> 대
        </p>
      </header>
      <img src={MAIN_BANNER_IMAGE} alt="메인 배너" />

      {/* main-content: 좌우 배치 (필터 + 차량 목록) */}
      <div className="main-content100">
        {/* 왼쪽 필터 영역 */}
        <div className="filter-container">
          <UsedCarFilter filters={filters} setFilters={setFilters} />
        </div>
        {/* 오른쪽 차량 목록 영역 */}
        <div className="content">
          <main className="car-list">
            {adjustedCars.map((car) =>
              car.isDummy ? (
                <div key={car.vehicleNo} className="car-card dummy-card"></div>
              ) : (
                <div
                  key={car.vehicleNo}
                  className="car-card"
                  onClick={() => handleCardClick(car.vehicleNo)}
                >
                  <h3 className="used-car-name">
                    {car.vehicleName || "이름 없음"}
                  </h3>
                  <img src={getImageSrc(car)} alt="차량 이미지" className="car-image" />
                  <p>브랜드: {car.brand || "정보 없음"}</p>
                  <p>
                    연식: {car.modelYear ? `${car.modelYear}년` : "정보 없음"}
                  </p>
                  <p>
                    {car.carKm ? `${car.carKm.toLocaleString()} km` : "주행거리 없음"}
                  </p>
                  <p>
                    가격: {car.price ? `₩${car.price.toLocaleString()}` : "가격 정보 없음"}
                  </p>
                  <p>판매점: {car.dealerLocation || "정보 없음"}</p>
                  <p>색상: {car.color || "정보 없음"}</p>
                </div>
              )
            )}
          </main>
          <Chatbot/>
        {/* 페이지네이션 */}
<div className="pagination">
  {/* ◀ 이전 버튼 */}
  {currentPage > 1 && (
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    ◀
  </button>
  )}
  {/* 페이지 번호 버튼 */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      disabled={page === currentPage}
    >
      {page}
    </button>
  ))}

  {/* ▶ 다음 버튼 */}
  
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    ▶
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default UsedCarBoard;
