import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiAxios from "../lib/apiAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentalCarDetail = () => {
  const { rentalCarNo } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [insuranceIncluded, setInsuranceIncluded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  /** ✅ 렌트카 정보 불러오기 */
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await apiAxios.get(`/rental/list/${rentalCarNo}`);
        setCar(response.data);
      } catch (error) {
        console.error("렌트카 상세 정보 불러오기 실패:", error);
      }
    };
    fetchCarDetails();
  }, [rentalCarNo]);

  /** ✅ 대여 금액 및 기간 계산 */
  useEffect(() => {
    if (startDate && endDate && car) {
      if (endDate < startDate) {
        alert("🚨 반납 날짜는 대여 시작 날짜보다 이후여야 합니다.");
        setEndDate(null);
        return;
      }

      const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
      const startHour = parseInt(startTime.split(":")[0], 10);
      const endHour = parseInt(endTime.split(":")[0], 10);

      let hours = endHour - startHour;
      if (hours < 0) hours += 24; // 반납 시간이 시작 시간보다 빠르면 하루 추가

      const calculatedTotalDays = days > 0 ? days : 0;
      const calculatedTotalHours = hours >= 0 ? hours : 0;

      setTotalDays(calculatedTotalDays);
      setTotalHours(calculatedTotalHours);

      let calculatedTotalPrice =
        calculatedTotalDays * (car?.pricePerDay || 0) + calculatedTotalHours * (car?.hourlyPrice || 0);
      if (insuranceIncluded) calculatedTotalPrice += car?.insuranceFee || 0;
      setTotalPrice(calculatedTotalPrice);
    }
  }, [startDate, endDate, startTime, endTime, insuranceIncluded, car]);

  /** ✅ 다음 페이지로 이동 */
  const handleNext = () => {
    if (!startDate || !endDate) {
      alert("🚨 대여 날짜를 선택하세요.");
      return;
    }

    navigate("/rental/payment", {
      state: {
        rentalCarNo,
        startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(),
        startTime,
        endTime,
        insuranceIncluded,
        totalPrice,
        totalDays,
        totalHours,
      },
    });
  };

  return (
    <div className="rental-detail">
      <h1>🚗 {car?.model} 상세 정보</h1>
      <div className="car-image">
        {car?.carImage ? <img src={car.carImage} alt={car.model} /> : <span>이미지 없음</span>}
      </div>
      <p>🚘 {car?.model}</p>
      <p>🛠 차량 종류 : {car?.type}</p>
      <p>📍 위치 : {car?.location}</p>
      <p>⛽ 연료 : {car?.fuel}</p>
      <p>⚙ 변속기 : {car?.transmission}</p>
      <p>💰 1일 요금 : {car?.pricePerDay?.toLocaleString() || 0} 원</p>
      <p>⏳ 시간당 요금 : {car?.hourlyPrice?.toLocaleString() || 0} 원</p>

      {/* ✅ 날짜 선택 */}
      <div className="date-selection">
        <label>📅 시작 날짜:</label>
        <DatePicker selected={startDate} onChange={setStartDate} dateFormat="yyyy-MM-dd" />

        {/* ✅ 시간 선택 */}
        <div className="time-selection">
          <label>🕒 시작 시간:</label>
          <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
            {Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`).map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>

          <label>📅 반납 날짜:</label>
          <DatePicker selected={endDate} onChange={setEndDate} dateFormat="yyyy-MM-dd" />
        </div>

        <label>🕒 반납 시간:</label>
        <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
          {Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`).map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      {/* ✅ 보험 여부 선택 */}
      <div>
        <input
          type="checkbox"
          checked={insuranceIncluded}
          onChange={() => setInsuranceIncluded(!insuranceIncluded)}
        />
        <label> 보험 포함 ({car?.insuranceFee?.toLocaleString() || 0} 원)</label>
      </div>

      {/* ✅ 대여 기간 정보 */}
      <p>📆 대여 기간: {totalDays}일 {totalHours}시간</p>

      {/* ✅ 총 결제 금액 */}
      <p>💰 총 결제 금액: {totalPrice.toLocaleString() || 0} 원</p>

      <button onClick={handleNext}>다음으로</button>
    </div>
  );
};

export default RentalCarDetail;
