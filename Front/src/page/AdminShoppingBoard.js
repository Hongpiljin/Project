import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminShoppingBoard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 400; // ✅ 한 페이지당 400개씩 표시
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/admin/shopping/list");
        const data = await response.json();

        console.log("📌 받아온 상품 개수:", data.length);
        setProducts(data);
      } catch (error) {
        console.error("❌ 상품 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ 현재 페이지에 맞는 상품 목록 필터링 (useMemo 적용)
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return products.slice(startIdx, startIdx + itemsPerPage);
  }, [products, currentPage]);

  // ✅ 상품 추가 버튼 클릭 시 이동
  const handleAddProduct = () => {
    navigate("/admin/shopping/add");
  };

  // ✅ 상품 수정 버튼 클릭 시 이동
  const handleEdit = (productId, productColor) => {
    navigate(`/admin/shopping/update/${productId}/${encodeURIComponent(productColor || "default")}`);
  };

  // ✅ 상품 삭제 기능 (즉시 UI 반영)
  const handleDelete = async (productId, productColor) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(
        `http://localhost:9999/api/admin/shopping/delete/${productId}/${encodeURIComponent(productColor || "default")}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("✅ 상품이 삭제되었습니다.");
        setProducts((prev) =>
          prev.filter(
            (product) =>
              !(
                product.productId === productId &&
                (product.productColor || "default") === (productColor || "default")
              )
          )
        );
      } else {
        alert("❌ 상품 삭제 실패.");
      }
    } catch (error) {
      console.error("❌ 상품 삭제 중 오류 발생:", error);
      alert("상품 삭제 중 오류가 발생했습니다.");
    }
  };

  // ✅ 페이지네이션 UI (이전/다음 버튼)
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
      <h1>쇼핑몰 관리 페이지</h1>
      <p>여기에서 쇼핑몰 상품을 관리할 수 있습니다.</p>

      {/* 🔹 상품 추가 버튼 */}
      <button onClick={handleAddProduct}>+ 상품 추가</button>

      {/* 🔹 로딩 상태 처리 */}
      {loading ? (
        <p>🔄 상품 목록을 불러오는 중...</p>
      ) : (
        <>
          <table border="1">
            <thead>
              <tr>
                <th>상품 ID</th>
                <th>상품명</th>
                <th>카테고리(대)</th>
                <th>카테고리(중)</th>
                <th>카테고리(세부)</th>
                <th>가격</th>
                <th>재고</th>
                <th>색상</th>
                <th>보관 위치</th>
                <th>이미지</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr key={`${product.productId}-${product.productColor || "default"}`}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.categoryMain}</td>
                    <td>{product.categorySub}</td>
                    <td>{product.categoryDetail}</td>
                    <td>{product.productPrice.toLocaleString()} 원</td>
                    <td>{product.productCount}</td>
                    <td>{product.productColor || "없음"}</td>
                    <td>{product.storeLocation || "없음"}</td>
                    <td>
                      {product.productImageBase64 ? (
                        <img
                          src={`data:image/png;base64,${product.productImageBase64}`}
                          alt="상품 이미지"
                          width="50"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ) : (
                        "이미지 없음"
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(product.productId, product.productColor)}>수정</button>
                      <button onClick={() => handleDelete(product.productId, product.productColor)}>삭제</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">등록된 상품이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 🔹 페이지네이션 */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀ 이전
            </button>
            <span style={{ margin: "0 10px" }}>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              다음 ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
