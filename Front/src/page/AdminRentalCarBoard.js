import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminRentalCarBoard() {
  const [rentalCars, setRentalCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9999/api/admin/rental-cars/list')
      .then(response => response.json())
      .then(data => setRentalCars(data))
      .catch(error => console.error('🚨 렌트카 목록 불러오기 실패:', error));
  }, []);

  // ✅ 렌트카 추가 버튼 클릭 시 (새로운 렌트카 추가 페이지로 이동)
  const handleAddRentalCar = () => {
    navigate('/admin/rental-cars/add');
  };

  // ✅ 수정 버튼 클릭 시 (렌트카 ID 포함하여 수정 페이지로 이동)
  const handleEdit = (rentalCarNo) => {
    navigate(`/admin/rental-cars/update/${rentalCarNo}`);
  };

  // ✅ 삭제 버튼 클릭 시 (해당 렌트카 삭제)
  const handleDelete = (rentalCarNo) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      fetch(`http://localhost:9999/api/admin/rental-cars/${rentalCarNo}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          alert('🚗 렌트카가 삭제되었습니다.');
          setRentalCars(rentalCars.filter(car => car.rentalCarNo !== rentalCarNo));
        } else {
          alert('🚨 렌트카 삭제 실패.');
        }
      })
      .catch(error => console.error('🚨 렌트카 삭제 중 오류 발생:', error));
    }
  };

  return (
    <div>
      <h1>🚗 렌트카 관리 페이지</h1>
      <p>여기에서 렌트카를 관리할 수 있습니다.</p>

      {/* 🔹 렌트카 추가 버튼 (테이블 상단) */}
      <button onClick={handleAddRentalCar} style={{ marginBottom: '10px', padding: '8px 16px', fontSize: '16px' }}>
        + 렌트카 추가
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>렌트카 번호</th>
            <th>모델명</th>
            <th>차량 종류</th>
            <th>위치</th>
            <th>연료 타입</th>
            <th>변속기</th>
            <th>일 요금</th>
            <th>시간당 요금</th>
            <th>제조년도</th>
            <th>번호판</th>
            <th>보험료</th>
            <th>보험 포함</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {rentalCars.length > 0 ? (
            rentalCars.map(car => (
              <tr key={car.rentalCarNo}>
                <td>{car.rentalCarNo}</td>
                <td>{car.model}</td>
                <td>{car.type}</td>
                <td>{car.location}</td>
                <td>{car.fuel}</td>
                <td>{car.transmission}</td>
                <td>{car.pricePerDay.toLocaleString()} 원</td>
                <td>{car.hourlyPrice.toLocaleString()} 원</td>
                <td>{car.manufactureYear}</td>
                <td>{car.plateNumber}</td>
                <td>{car.insuranceFee.toLocaleString()} 원</td>
                <td>{car.insuranceIncluded ? "✅ 포함" : "❌ 미포함"}</td>
                <td>
                  <button onClick={() => handleEdit(car.rentalCarNo)}>수정</button>
                  <button onClick={() => handleDelete(car.rentalCarNo)}>삭제</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">등록된 렌트카가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
