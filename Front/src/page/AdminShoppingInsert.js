import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categoryData = {
  대분류: ["국산차 용품", "수입차 용품", "실내용품", "레이싱/튜닝"],
  중분류: {
    "국산차 용품": ["현대차", "기아자동차", "제네시스", "쉐보레", "르노삼성", "쌍용자동차"],
    "수입차 용품": ["벤츠", "BMW", "아우디", "폭스바겐", "포드", "도요타", "혼다", "닛산"],
    "실내용품": ["매트", "시트커버", "핸들커버", "방향제", "청소용품"],
    "레이싱/튜닝": ["스포일러", "바디킷", "서스펜션", "브레이크", "엔진튜닝"],
  },
  소분류: {
    현대차: ["아반떼", "소나타", "그랜저", "싼타페", "투싼"],
    기아자동차: ["모닝", "K3", "K5", "K7", "스포티지", "쏘렌토"],
    제네시스: ["G70", "G80", "G90"],
    쉐보레: ["스파크", "말리부", "트랙스", "이쿼녹스"],
    르노삼성: ["SM3", "SM5", "SM6", "QM3", "QM6"],
    쌍용자동차: ["티볼리", "코란도", "렉스턴"],
    벤츠: ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC"],
    BMW: ["1시리즈", "3시리즈", "5시리즈", "7시리즈", "X1", "X3", "X5"],
    아우디: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7"],
  },
};

export default function AdminShoppingInsert() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    categoryMain: "",
    categorySub: "",
    categoryDetail: "",
    productPrice: "",
    productImageFile: null, // ✅ 파일 저장
    productColors: [{ color: "", stock: "", storeLocation: "" }],
  });

  // ✅ 입력값 변경 핸들러
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ 색상 및 재고 추가
  const addColorField = () => {
    setProduct({
      ...product,
      productColors: [...product.productColors, { color: "", stock: "", storeLocation: "" }],
    });
  };

  // ✅ 색상 및 재고 삭제 (최소 1개 유지)
  const removeColorField = (index) => {
    if (product.productColors.length > 1) {
      const updatedColors = product.productColors.filter((_, i) => i !== index);
      setProduct({ ...product, productColors: updatedColors });
    }
  };

  // ✅ 색상 및 재고 변경 핸들러
  const handleColorChange = (index, field, value) => {
    const updatedColors = [...product.productColors];
    updatedColors[index][field] = value;
    setProduct({ ...product, productColors: updatedColors });
  };

  // ✅ 상품 추가 요청
  const handleInsert = () => {
    const formData = new FormData();
  
    // ✅ 상품 정보 개별 필드로 추가
    formData.append("productName", product.productName);
    formData.append("categoryMain", product.categoryMain);
    formData.append("categorySub", product.categorySub);
    formData.append("categoryDetail", product.categoryDetail);
    formData.append("productPrice", product.productPrice);
  
    // ✅ 색상, 재고, 지점 리스트를 문자열로 변환하여 전송 (JSON 없이)
    product.productColors.forEach((item, index) => {
      formData.append(`productColor_${index}`, item.color);
      formData.append(`productCount_${index}`, item.stock);
      formData.append(`storeLocation_${index}`, item.storeLocation || "");
    });
  
    // ✅ Base64 이미지 추가
    if (product.productImageBase64) {
      formData.append("productImage", product.productImageBase64);
    }
  
    fetch("http://localhost:9999/api/admin/shopping/insert", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("상품이 추가되었습니다.");
          navigate("/admin/shopping-board");
        } else {
          alert("상품 추가 실패");
        }
      })
      .catch((error) => console.error("상품 추가 중 오류 발생:", error));
  };
  
  // ✅ Base64 이미지 변환
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, productImageBase64: reader.result.split(",")[1] }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div>
      <h1>상품 추가</h1>
      <label>상품명:</label>
      <input type="text" name="productName" value={product.productName} onChange={handleChange} /><br />

      <label>카테고리(대):</label>
      <select name="categoryMain" value={product.categoryMain} onChange={handleChange}>
        <option value="">선택하세요</option>
        {categoryData.대분류.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select><br />

      <label>카테고리(중):</label>
      <select name="categorySub" value={product.categorySub} onChange={handleChange}>
        <option value="">선택하세요</option>
        {categoryData.중분류[product.categoryMain]?.map((subCategory) => (
          <option key={subCategory} value={subCategory}>{subCategory}</option>
        ))}
      </select><br />

      <label>카테고리(세부):</label>
      <select name="categoryDetail" value={product.categoryDetail} onChange={handleChange}>
        <option value="">선택하세요</option>
        {categoryData.소분류[product.categorySub]?.map((detailCategory) => (
          <option key={detailCategory} value={detailCategory}>{detailCategory}</option>
        ))}
      </select><br />

      <label>가격:</label>
      <input type="number" name="productPrice" value={product.productPrice} onChange={handleChange} /><br />

      <label>상품 이미지:</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} /><br />

      <label>색상, 재고 및 보관 위치:</label>
      {product.productColors.map((item, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <input type="text" placeholder="색상" value={item.color} onChange={(e) => handleColorChange(index, "color", e.target.value)} />
          <input type="number" placeholder="재고" value={item.stock} onChange={(e) => handleColorChange(index, "stock", e.target.value)} />
          <input type="text" placeholder="지점명" value={item.storeLocation} onChange={(e) => handleColorChange(index, "storeLocation", e.target.value)} />
          <button type="button" onClick={() => removeColorField(index)}>삭제</button>
        </div>
      ))}
      <button type="button" onClick={addColorField}>색상 추가</button><br />

      <button onClick={handleInsert}>추가하기</button>
      <button onClick={() => navigate("/admin/shopping-board")}>취소</button>
    </div>
  );
}
