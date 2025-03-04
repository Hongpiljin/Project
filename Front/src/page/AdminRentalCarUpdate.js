import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminRentalCarUpdate() {
  const { rentalCarNo } = useParams(); // URL에서 렌트카 번호 가져오기
  const navigate = useNavigate();

  const [rentalCar, setRentalCar] = useState(null); // 초기값을 null로 설정

  // ✅ 기존 렌트카 정보 불러오기
  useEffect(() => {
    fetch(`http://localhost:9999/api/admin/rental-cars/${rentalCarNo}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("렌트카 정보를 불러오는 데 실패했습니다.");
        }
        return response.json();
      })
      .then(data => setRentalCar(data))
      .catch(error => console.error("🚨 렌트카 정보 불러오기 실패:", error));
  }, [rentalCarNo]);

  // ✅ 데이터가 로드되기 전에 로딩 화면 표시
  if (!rentalCar) {
    return <div>⏳ 렌트카 정보를 불러오는 중...</div>;
  }

  // ✅ 입력값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRentalCar(prevState => ({
      ...prevState,
      [name]: value || "", // 빈값 방지
    }));
  };

  // ✅ 렌트카 정보 업데이트 요청
  const handleUpdate = async () => {
    const requestData = {
      rentalCarNo: rentalCar.rentalCarNo,
      model: rentalCar.model.trim(),
      type: rentalCar.type.trim(),
      location: rentalCar.location.trim(),
      fuel: rentalCar.fuel.trim(),
      transmission: rentalCar.transmission.trim(),
      pricePerDay: parseFloat(rentalCar.pricePerDay) || 0,
      hourlyPrice: parseFloat(rentalCar.hourlyPrice) || 0,
      manufactureYear: parseInt(rentalCar.manufactureYear, 10) || 0,
      plateNumber: rentalCar.plateNumber.trim(),
      insuranceFee: parseFloat(rentalCar.insuranceFee) || 0,
      status: rentalCar.status || 1, // 기본값 1 (활성화 상태)
    };

    console.log("🚀 업데이트 데이터:", JSON.stringify(requestData, null, 2));

    try {
      const response = await fetch("http://localhost:9999/api/admin/rental-cars/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("🚗 렌트카 정보가 수정되었습니다.");
        navigate("/admin/rental-cars");
      } else {
        const errorMessage = await response.text();
        alert(`🚨 렌트카 수정 실패: ${errorMessage}`);
      }
    } catch (error) {
      console.error("❌ 렌트카 수정 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <h1>🚗 렌트카 수정</h1>

      <label>렌트카 번호:</label>
      <input type="text" name="rentalCarNo" value={rentalCar.rentalCarNo || ""} readOnly /><br />

      <label>모델명:</label>
      <input type="text" name="model" value={rentalCar.model || ""} onChange={handleChange} /><br />

      <label>차량 종류:</label>
      <input type="text" name="type" value={rentalCar.type || ""} onChange={handleChange} /><br />

      <label>위치:</label>
      <input type="text" name="location" value={rentalCar.location || ""} onChange={handleChange} /><br />

      <label>연료 타입:</label>
      <select name="fuel" value={rentalCar.fuel || ""} onChange={handleChange}>
        <option value="">선택하세요</option>
        <option value="가솔린">가솔린</option>
        <option value="디젤">디젤</option>
        <option value="전기">전기</option>
        <option value="하이브리드">하이브리드</option>
      </select><br />

      <label>변속기:</label>
      <select name="transmission" value={rentalCar.transmission || ""} onChange={handleChange}>
        <option value="">선택하세요</option>
        <option value="자동">자동</option>
        <option value="수동">수동</option>
      </select><br />

      <label>일 요금:</label>
      <input type="number" name="pricePerDay" value={rentalCar.pricePerDay || ""} onChange={handleChange} /><br />

      <label>시간당 요금:</label>
      <input type="number" name="hourlyPrice" value={rentalCar.hourlyPrice || ""} onChange={handleChange} /><br />

      <label>제조년도:</label>
      <input type="number" name="manufactureYear" value={rentalCar.manufactureYear || ""} onChange={handleChange} /><br />

      <label>번호판:</label>
      <input type="text" name="plateNumber" value={rentalCar.plateNumber || ""} onChange={handleChange} /><br />

      <label>보험료:</label>
      <input type="number" name="insuranceFee" value={rentalCar.insuranceFee || ""} onChange={handleChange} /><br />

      <button onClick={handleUpdate}>🚗 수정하기</button>
      <button onClick={() => navigate("/admin/rental-cars")}>취소</button>
    </div>
  );
}
