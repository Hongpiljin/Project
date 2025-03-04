
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleUsedCarManagement = () => {
    navigate('/admin/used-car-board');
  };

  const handleShoppingManagement = () => {
    navigate('/admin/shopping-board');
  };
  
  const handleRentalCarManagement = () => {
    navigate('/admin/rentalcarlist');
  };

  return (
    <div>
      <h1>관리자 대시보드</h1>
      <p>여기는 관리자 전용 페이지입니다.</p>
      <button onClick={handleUsedCarManagement}>
        중고차 게시판 관리
      </button>
      <button onClick={handleShoppingManagement} style={{ marginLeft: '10px' }}>
        쇼핑몰 관리
      </button>
      <button onClick={handleRentalCarManagement} style={{ marginLeft: '10px' }}>
        렌트카 관리
      </button>
    </div>
  );
}
