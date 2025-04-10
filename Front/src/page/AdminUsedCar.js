import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 추가

// 서버 URL 및 기본 이미지 URL 상수 선언
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const DEFAULT_IMAGE_URL = `${SERVER_URL}/images/usedcar_imageX.png`;

// 이미지 URL 처리 함수 (CarPaymentdetail.js와 동일)
const getImageSrc = (image) => {
  if (!image || image.length === 0) {
    return DEFAULT_IMAGE_URL;
  }
  // 이미지 데이터가 이미 data URL 형식인 경우 그대로 반환
  if (image.startsWith("data:image")) {
    return image;
  }
  // 서버에서 URL로 내려온 경우
  if (image.startsWith("/images")) {
    return `${SERVER_URL}${image}`;
  }
  // 이미 http로 시작하면 그대로 사용
  if (image.startsWith("http")) {
    return image;
  }
  // 그 외의 경우 Base64 인코딩된 데이터라고 가정하여 접두사 추가
  return `data:image/png;base64,${image}`;
};

export default function AdminUsedCar() {
  const [cars, setCars] = useState([]); // 전체 차량 목록
  const [filteredCars, setFilteredCars] = useState([]); // 검색 결과
  const [searchName, setSearchName] = useState(''); // 차량명 검색어
  const [searchNo, setSearchNo] = useState(''); // 차량번호 검색어
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 중고차 목록 읽어옴
  useEffect(() => {
    fetch('http://localhost:9999/api/admin/used-cars')
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data); // 초기값 설정
      })
      .catch((err) => console.error(err));
  }, []);

  // 검색 기능
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchName.trim()) params.append("vehicleName", searchName.trim());
    if (searchNo.trim()) params.append("vehicleNo", searchNo.trim());

    fetch(`http://localhost:9999/api/admin/used-cars/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setFilteredCars(data))
      .catch((err) => console.error("검색 실패:", err));
  };

  // 삭제 기능
  const handleDelete = (vehicleNo) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      fetch(`http://localhost:9999/api/admin/used-cars/${vehicleNo}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            const updatedCars = cars.filter((car) => car.vehicleNo !== vehicleNo);
            setCars(updatedCars);
            setFilteredCars(updatedCars);
          } else {
            alert('삭제 실패');
          }
        })
        .catch((err) => console.error('Error deleting car:', err));
    }
  };

  return (
    <div>
      <h1>중고차 게시판 관리</h1>
      <h2>"▼" 차량 목록보기 클릭시 수정 삭제 버튼 동작합니다</h2>

      {/* 차량명 및 차량번호 검색 */}
      <div>
        <input
          type="text"
          placeholder="차량명 검색"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="차량번호 검색"
          value={searchNo}
          onChange={(e) => setSearchNo(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {/* 차량 등록 버튼 추가 */}
      <button onClick={() => navigate('/admin/used-car-add')}>
        🚗 새로운 차량 등록
      </button>

      {/* 드롭다운 버튼 */}
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {isDropdownOpen ? '▲ 목록 닫기' : '▼ 차량 목록 보기'}
      </button>

      {/* 드롭다운으로 차량 목록 표시 */}
      {isDropdownOpen && (
        <div
          style={{
            marginTop: "10px",
            border: "1px solid #ddd",
            padding: "10px",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <table border="1" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>차량번호</th>
                <th>차량명</th>
                <th>가격</th>
                <th>이미지</th>
                <th>삭제</th>
                <th>수정</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <tr key={car.vehicleNo}>
                    <td>{car.vehicleNo}</td>
                    <td>{car.vehicleName}</td>
                    <td>{car.price.toLocaleString()} 원</td>
                    <td>
                      <img
                        src={getImageSrc(car.mainImage)}
                        alt={car.vehicleName}
                        style={{ width: "80px", height: "auto" }}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDelete(car.vehicleNo)}>
                        삭제
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          console.log("수정할 차량 번호:", car.vehicleNo);
                          navigate(`/admin/used-car-update/${car.vehicleNo}`);
                        }}
                      >
                        수정
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    검색 결과 없음
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
