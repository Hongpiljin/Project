import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminShoppingUpdate() {
  const { productId, productColor } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    categoryMain: "",
    categorySub: "",
    categoryDetail: "",
    productPrice: "",
    productCount: "",
    productColor: "",
    storeLocation: "",
    productImageBase64: "", // ✅ Base64 이미지 저장
  });

  const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 상태 추가

  // ✅ 기존 상품 정보 불러오기
  useEffect(() => {
    fetch(`http://localhost:9999/api/admin/shopping/${productId}/${productColor}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("불러온 상품 데이터:", data);
        setProduct(data);
        
        if (data.productImageBase64) {
          setPreviewImage(`data:image/png;base64,${data.productImageBase64}`);
        }
      })
      .catch((error) => console.error("상품 정보 불러오기 실패:", error));
  }, [productId, productColor]);

  // ✅ 입력값 변경 핸들러
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ 이미지 파일을 Base64로 변환하여 저장
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setProduct({ ...product, productImageBase64: base64String });
        setPreviewImage(reader.result); // ✅ 선택한 이미지 미리보기 즉시 갱신
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ 상품 정보 업데이트 요청 (`multipart/form-data` 사용)
  const handleUpdate = () => {
    const formData = new FormData();

    // ✅ 상품 정보 개별 필드로 추가
    formData.append("productId", productId);
    formData.append("productName", product.productName);
    formData.append("categoryMain", product.categoryMain);
    formData.append("categorySub", product.categorySub);
    formData.append("categoryDetail", product.categoryDetail);
    formData.append("productPrice", product.productPrice);
    formData.append("productCount", product.productCount);
    formData.append("productColor", product.productColor);
    formData.append("storeLocation", product.storeLocation);

    // ✅ Base64 이미지 추가
    if (product.productImageBase64) {
      formData.append("productImage", product.productImageBase64);
    }

    fetch("http://localhost:9999/api/admin/shopping/update", {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("상품이 수정되었습니다.");
          navigate("/admin/shopping-board");
        } else {
          alert("상품 수정 실패");
        }
      })
      .catch((error) => console.error("상품 수정 중 오류 발생:", error));
  };

  return (
    <div>
      <h1>상품 수정</h1>

      <label>상품명:</label>
      <input type="text" name="productName" value={product.productName || ""} onChange={handleChange} /><br />

      <label>카테고리(대):</label>
      <input type="text" name="categoryMain" value={product.categoryMain || ""} onChange={handleChange} /><br />

      <label>카테고리(중):</label>
      <input type="text" name="categorySub" value={product.categorySub || ""} onChange={handleChange} /><br />

      <label>카테고리(세부):</label>
      <input type="text" name="categoryDetail" value={product.categoryDetail || ""} onChange={handleChange} /><br />

      <label>가격:</label>
      <input type="number" name="productPrice" value={product.productPrice || ""} onChange={handleChange} /><br />

      <label>재고:</label>
      <input type="number" name="productCount" value={product.productCount || ""} onChange={handleChange} /><br />

      <label>색상:</label>
      <input type="text" name="productColor" value={product.productColor || ""} onChange={handleChange} /><br />

      <label>보관 위치:</label>
      <input type="text" name="storeLocation" value={product.storeLocation || ""} onChange={handleChange} /><br />

      <label>이미지 업로드:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} /><br />

      <div>
        {previewImage ? (
          <>
            <p>미리보기:</p>
            <img src={previewImage} alt="상품 미리보기" width="100" />
          </>
        ) : (
          <p>이미지 없음</p>
        )}
      </div>

      <button onClick={handleUpdate}>수정하기</button>
      <button onClick={() => navigate("/admin/shopping-board")}>취소</button>
    </div>
  );
}
