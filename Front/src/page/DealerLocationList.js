import React from "react";
import { Link } from "react-router-dom";
import "../css/DealerLocationList.css";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const regionData = [
  {
    region: "울산",
    image: `${SERVER_URL}/images/대기실1.jpg`,
    phone: "052-xxx-xxxx",
    address: "울산시 ○○구 ○○동 123-4",
    carCount: 140,
  },
  {
    region: "부산",
    image: `${SERVER_URL}/images/대기실2.jpg`,
    phone: "051-xxx-xxxx",
    address: "부산시 ○○구 ○○동 123-4",
  },
  {
    region: "경기",
    image: `${SERVER_URL}/images/대기실3.jpg`,
    phone: "031-xxx-xxxx",
    address: "경기도 ○○시 ○○동 123-4",
  },
  {
    region: "인천",
    image: `${SERVER_URL}/images/대기실4.jpg`,
    phone: "032-xxx-xxxx",
    address: "인천시 ○○구 ○○동 123-4",
  },
  {
    region: "대구",
    image: `${SERVER_URL}/images/대기실5.jpg`,
    phone: "053-xxx-xxxx",
    address: "대구시 ○○구 ○○동 123-4",
  },
  {
    region: "대전",
    image: `${SERVER_URL}/images/대기실6.jpg`,
    phone: "042-xxx-xxxx",
    address: "대전시 ○○구 ○○동 123-4",
    },
  {
    region: "서울",
    image: `${SERVER_URL}/images/대기실7.jpg`,
    phone: "02-xxx-xxxx",
    address: "서울시 ○○구 ○○동 123-4",
  },
];

const DealerLocationList = () => {
  return (
    <div className="dealer-container">
      <h2 className="dealer-title">전국 직영점 목록</h2>
      <div className="dealer-grid">
        {regionData.map((item, idx) => (
          <div key={idx} className="dealer-card">
            <img src={item.image} alt={item.region} className="dealer-image" />

            <div className="dealer-info">
              <h3 className="dealer-region">{item.region}</h3>
              <p className="dealer-phone">{item.phone}</p>
              <p className="dealer-address">{item.address}</p>

              {/* 주소보기 버튼 (예시) */}
              <Link
                to={`/cars/${encodeURIComponent(item.region)}`}
                className="dealer-button"
              >
                바로가기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealerLocationList;
