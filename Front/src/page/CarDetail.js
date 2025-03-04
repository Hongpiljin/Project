import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/UsedCarDetail.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const DEFAULT_IMAGE_URL = `${SERVER_URL}/images/usedcar_imageX.png`;

// 구매 정보 컴포넌트
const CarPurchaseDetails = ({ carDetails }) => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate('/CarPaymentdetaile', { state: { carDetails } });
  };

  // 직영점 방문 예약
  const handleDirectVisit = () => {
    navigate('/directdealerlocation', { state: { carDetails } });
  };

  return (
    <div className="car-detail-purchase-details">
      <div className="car-detail-phone">{carDetails.phone}</div>
      <div className="car-detail-name">{carDetails.name}</div>
      <div className="car-detail-info">
        {`${carDetails.year} · ${carDetails.mileage} · ${carDetails.fuelType}`}
      </div>

      <div className="car-detail-cost-breakdown">
        <h3>총 예상 구매비용</h3>
        <p>구매비용 계산기</p>
        <ul>
          <li><strong>차량가:</strong> {carDetails.purchaseDetails.vehiclePrice.toLocaleString()}원</li>
          <li><strong>이전등록비:</strong> {carDetails.purchaseDetails.transferTax.toLocaleString()}원</li>
          <li><strong>관리비용:</strong> {carDetails.purchaseDetails.managementFee.toLocaleString()}원</li>
          <li><strong>등록신청대행수수료:</strong> {carDetails.purchaseDetails.registrationFee.toLocaleString()}원</li>
          <li><strong>K Car Warranty 가입비:</strong> {carDetails.purchaseDetails.warrantyFee.toLocaleString()}원</li>
          <li><strong>성능책임보험료:</strong> {carDetails.purchaseDetails.performanceInsurance.toLocaleString()}원</li>
          <li><strong>배송비:</strong> {carDetails.purchaseDetails.deliveryFee}</li>
        </ul>
        <div className="car-detail-total-price">
          합계: {carDetails.totalPrice.toLocaleString()}원
        </div>
      </div>

      <div className="car-detail-purchase-buttons">
        <button className="car-detail-home-service" onClick={handlePurchase}>
          차량 바로구매
        </button>
        <div className="car-detail-availability">{carDetails.availability}</div>
        <button className="car-detail-direct-visit" onClick={handleDirectVisit}>
          직영점 방문 예약하기
        </button>
      </div>
    </div>
  );
};

const CarDetail = () => {
  const { vehicleNo } = useParams();
  const [car, setCar] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/used-cars/detail?vehicleNo=${vehicleNo}`)
      .then((response) => {
        const carData = response.data;
        setCar(carData);

        // 대표 이미지
        let mainImg =
          carData.base64MainImage ||
          (carData.mainImage?.startsWith('data:image') ? carData.mainImage : null);

        if (!mainImg && carData.mainImage) {
          mainImg = `data:image/png;base64,${carData.mainImage}`;
        }
        setMainImage(mainImg || DEFAULT_IMAGE_URL);

        // 추가 이미지 목록
        const processedImages = (carData.usedCarImages || []).map((img) => {
          if (img.imageData) {
            return img.imageData.startsWith('data:image')
              ? img.imageData
              : `data:image/png;base64,${img.imageData}`;
          }
          return DEFAULT_IMAGE_URL;
        });

        setAdditionalImages(processedImages);
      })
      .catch((error) => {
        console.error('Failed to fetch car details:', error);
      });
  }, [vehicleNo]);

  // 좌우 화살표로 이미지 넘기기
  const handleNextImage = () => {
    if (additionalImages.length === 0) return;
    const nextIndex = (currentIndex + 1) % additionalImages.length;
    setMainImage(additionalImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevImage = () => {
    if (additionalImages.length === 0) return;
    const prevIndex = (currentIndex - 1 + additionalImages.length) % additionalImages.length;
    setMainImage(additionalImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // FAQ 토글
  const faqData = [
    { question: '내차사기 홈서비스란 무엇인가요?', answer: '온라인으로 차량을 선택하고 집 앞까지 배송받을 수 있는 서비스입니다.' },
    { question: '내차사기 홈서비스 신청은 어떻게 하나요?', answer: '홈페이지에서 차량을 선택한 후 결제하면 간편하게 신청이 완료됩니다.' },
    { question: '내차사기 홈서비스 결제는 어떻게 하나요?', answer: '신용카드, 계좌이체 등 다양한 결제 방법을 지원합니다.' },
    { question: '내차사기 홈서비스로 주문하면 어디든지 배송되나요?', answer: '일부 지역을 제외한 전국 배송이 가능합니다.' },
  ];
  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  if (!car) {
    return <p className="car-detail-loading">로딩 중...</p>;
  }

  // 구매 상세 정보에 전달할 props
  const carDetails = {
    vehicleNo: vehicleNo,
    phone: '0504-3184-3359',
    name: car.vehicleName,
    brand: car.brand,                     // 추가
    modelYear: car.modelYear,             // 추가 (숫자)
    year: car.modelYear ? `${car.modelYear}년` : "정보 없음", // 포맷된 연식
    mileage: car.car_km ? `${car.car_km.toLocaleString()} km` : "정보 없음",
    color: car.color,                     // 추가
    seatingCapacity: car.seatingCapacity, // 추가
    vehicleType: car.vehicleType,         // 추가
    transmission: car.transmission,       // 추가
    driveType: car.driveType,             // 추가
    fuelType: car.fuelType,
    dealerLocation: car.dealerLocation,   // 추가
    vehiclePlate: car.vehiclePlate,       // 추가
    mainImage: mainImage || DEFAULT_IMAGE_URL,
    purchaseDetails: {
      vehiclePrice: car.price,
      transferTax: 460000,
      managementFee: 352000,
      registrationFee: 33000,
      warrantyFee: 365000,
      performanceInsurance: 0,
      deliveryFee: '무료배송',
    },
    totalPrice: car.price + 460000 + 352000 + 33000 + 365000,
    availability: '금요일 1/31 도착',
  };

  return (
    <div className="car-detail-container">
      <h1 className="car-detail-title">{car.vehicleName}</h1>

      {/* 상단: 왼쪽(이미지+차량설명 등) / 오른쪽(구매 정보) */}
      <div className="car-detail-top-section">
        {/* ===== 왼쪽 열 ===== */}
        <div className="car-detail-left-column">
          {/* 이미지 섹션 */}
          <div className="car-detail-image-section">
            <div className="car-detail-main-image-container">
              {mainImage ? (
                <>
                  <img
                    src={mainImage}
                    alt={`${car.vehicleName} 대표 이미지`}
                    className="car-detail-main-image"
                    onError={(e) => (e.target.src = DEFAULT_IMAGE_URL)}
                  />
                  {/* 화살표 버튼 */}
                  {additionalImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="car-detail-arrow-button car-detail-left-arrow"
                      >
                        ❮
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="car-detail-arrow-button car-detail-right-arrow"
                      >
                        ❯
                      </button>
                    </>
                  )}
                </>
              ) : (
                <p>이미지를 불러오는 중...</p>
              )}
            </div>

            {/* 썸네일 목록 */}
            <div className="car-detail-thumbnail-container">
              {additionalImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${car.vehicleName} 추가 이미지 ${index + 1}`}
                  className={`car-detail-thumbnail-image ${
                    currentIndex === index ? 'car-detail-selected-thumbnail' : ''
                  }`}
                  onClick={() => {
                    setMainImage(image);
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
          </div>

          {/* 차량 정보 섹션 */}
          <div className="car-detail-car-details">
            <h2>차량 정보</h2>
            <ul>
              <li><strong>브랜드:</strong> {car.brand}</li>
              <li><strong>연식:</strong> {car.modelYear}년</li>
              <li><strong>가격:</strong> ₩{car.price.toLocaleString()}</li>
              <li><strong>색상:</strong> {car.color}</li>
              <li>
              주행거리: {car.carKm ? `${car.carKm.toLocaleString()} km` : "주행거리 없음"}
              </li>
              <li><strong>인승:</strong> {car.seatingCapacity}인승</li>
              <li><strong>차종:</strong> {car.vehicleType}</li>
              <li><strong>변속기:</strong> {car.transmission}</li>
              <li><strong>구동방식:</strong> {car.driveType}</li>
              <li><strong>연료:</strong> {car.fuelType}</li>
              <li><strong>판매점:</strong> {car.dealerLocation}</li>
              <li><strong>차량 번호:</strong> {car.vehiclePlate}</li>
            </ul>
          </div>

        

          {/* 차량 설명 섹션 */}
          <div className="car-detail-car-description">
            <h2>차량 설명</h2>
            <div
              className="car-detail-description-content"
              dangerouslySetInnerHTML={{
                __html: car.description || '설명 정보가 없습니다.',
              }}
            />
          </div>
        </div>

        {/* ===== 오른쪽 열 ===== */}
        <div className="car-detail-right-column">
          <CarPurchaseDetails carDetails={carDetails} />
        </div>
      </div>

      {/* FAQ 섹션 */}
      <div className="car-detail-faq-section">
        <h2>자주 하는 질문</h2>
        {faqData.map((faq, index) => (
          <div key={index} className="car-detail-faq-item">
            <button
              className="car-detail-faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </button>
            {openFAQ === index && (
              <p className="car-detail-faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      <div className="car-detail-action-buttons">
        <button
          onClick={() => navigate('/UsedCarBoard')}
          className="car-detail-back-button"
        >
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default CarDetail;
