import React, {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiAxios from "../lib/apiAxios";

export default function AdminRentalCarInsert() {
  const navigate = useNavigate();

  const [carImage, setCarImage] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  const [rentalCar, setRentalCar] = useState({
    model: "",
    type: "",
    location: "",
    fuel: "",
    transmission: "",
    pricePerDay: "",
    hourlyPrice: "",
    manufactureYear: "",
    plateNumber: "",
    insuranceFee: "",
    status: 1, // 기본값 (활성화 상태)
  });


  // 이미지 선택 시 미리보기 이미지 생성
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = await Promise.all(files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            file,
            url: reader.result,
            isServerImage: false,
            mainImage: false,
          });
        };
        reader.readAsDataURL(file);
      });
    }));

    setCarImage(prev => [...prev, ...files]);
    setPreviewImage(prev => [...prev, ...newPreviews]);
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRentalCar((prev) => ({
      ...prev,
      [name]: value.trim(), // 입력값 공백 제거
    }));
  };

  // 렌트카 추가 요청
  const handleInsert = async () => {
    if (!rentalCar.model.trim()) {
      alert("🚨 모델명을 입력해주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("model", rentalCar.model.trim());
    formData.append("type", rentalCar.type.trim());
    formData.append("location", rentalCar.location.trim());
    formData.append("fuel", rentalCar.fuel.trim());
    formData.append("transmission", rentalCar.transmission.trim());
    formData.append("pricePerDay", parseFloat(rentalCar.pricePerDay) || 0);
    formData.append("hourlyPrice", parseFloat(rentalCar.hourlyPrice) || 0);
    formData.append("manufactureYear", parseInt(rentalCar.manufactureYear, 10) || 0);
    formData.append("plateNumber", rentalCar.plateNumber.trim());
    formData.append("insuranceFee", parseFloat(rentalCar.insuranceFee) || 0);
    formData.append("status", rentalCar.status);

    // 이미지 파일을 FormData로 추가
    carImage.forEach((file) => {
      formData.append("carImage", file); // carImage는 파일 배열
    });
  
    try {
      console.log("🚀 전송 데이터:", formData);
  
      const response = await apiAxios.post("/api/admin/rental-cars/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Content-Type을 multipart/form-data로 설정
      });
  
      console.log("🚀 렌트카 추가 성공:", response.data);
      alert(`🚗 렌트카가 추가되었습니다! (번호: ${response.data.rentalCarNo})`);
      navigate("/admin/rental-cars");
    } catch (error) {
      console.error("❌ 렌트카 추가 오류:", error);
      alert("렌트카 추가에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>🚗 렌트카 추가</h1>

      <label>
        대표 이미지:
        <div className="preview-container">
          {previewImage.map((imageObj, index) => (
            <div key={index} className="image-preview">
              <img
                src={imageObj.url}
                alt="차량 이미지"
                onClick={(e) => {
                  e.preventDefault();
                }}
                onError={(e) => (e.target.src = "/default-image.png")}
              />
            </div>
          ))}
        </div>
      </label>

      <label>
        새 이미지 업로드:
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </label>

      <label>모델명:</label>
      <input type="text" name="model" value={rentalCar.model} onChange={handleChange} required /><br />

      <label>차량 종류:</label>
      <input type="text" name="type" value={rentalCar.type} onChange={handleChange} required /><br />

      <label>위치:</label>
      <input type="text" name="location" value={rentalCar.location} onChange={handleChange} required /><br />

      <label>연료 타입:</label>
      <select name="fuel" value={rentalCar.fuel} onChange={handleChange} required>
        <option value="">선택하세요</option>
        <option value="가솔린">가솔린</option>
        <option value="디젤">디젤</option>
        <option value="전기">전기</option>
        <option value="하이브리드">하이브리드</option>
      </select><br />

      <label>변속기:</label>
      <select name="transmission" value={rentalCar.transmission} onChange={handleChange} required>
        <option value="">선택하세요</option>
        <option value="자동">자동</option>
        <option value="수동">수동</option>
      </select><br />

      <label>일 요금:</label>
      <input type="number" name="pricePerDay" value={rentalCar.pricePerDay} onChange={handleChange} required /><br />

      <label>시간당 요금:</label>
      <input type="number" name="hourlyPrice" value={rentalCar.hourlyPrice} onChange={handleChange} required /><br />

      <label>제조년도:</label>
      <input type="number" name="manufactureYear" value={rentalCar.manufactureYear} onChange={handleChange} required /><br />

      <label>번호판:</label>
      <input type="text" name="plateNumber" value={rentalCar.plateNumber} onChange={handleChange} required /><br />

      <label>보험료:</label>
      <input type="number" name="insuranceFee" value={rentalCar.insuranceFee} onChange={handleChange} required /><br />

      <button onClick={handleInsert}>🚗 추가하기</button>
      <button onClick={() => navigate("/admin/rental-cars")}>취소</button>
    </div>
  );
}
