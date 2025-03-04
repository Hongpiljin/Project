package com.rental.mapper;

import java.io.InputStream;
import java.sql.Blob;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.rental.dto.ProductDTO;
import com.rental.dto.ProductDetailDTO;
import com.rental.dto.ReviewDTO;
import com.rental.dto.ShoppingPaymentDTO;
import com.rental.dto.ShoppingPaymentDetailDTO;

@Mapper
public interface ProductMapper {
  List<ProductDTO> selectProducts(Map<String, Object> params);

  int insertReview(ReviewDTO reviewDTO);

  List<ReviewDTO> getReviewsByProductId(int productId);

List<String> getAllProductImages();

void saveImagePath(Map<String, Object> params);

String getImagePathByProductId(int productId);

List<ProductDetailDTO> getProductDetailsByProductId(int productId);

 // 결제 번호 시퀀스 조회 (XML에서 처리)
 void insertShoppingPayment(ShoppingPaymentDTO payment); // 결제 정보 저장

 void insertShoppingPaymentDetail(ShoppingPaymentDetailDTO paymentDetail); // 결제 상세 저장
  int getNextPaymentNo();

  List<ProductDTO> getAllProductsWithDetails();

 // ✅ 상품 추가 (product 테이블)
 int insertProduct(ProductDTO productDTO);

 // ✅ 상품 상세 정보 추가 (product_detail 테이블)
 void insertProductDetail(ProductDetailDTO detail);

 Integer getProductStock(@Param("productId") int productId, @Param("productColor") String productColor); // 재고 확인

 void updateProductStock(@Param("productId") int productId, 
                            @Param("productColor") String productColor, 
                            @Param("productCount") int productCount); // 재고 차감

    void deleteProduct(Long productId);

    ProductDetailDTO getProductByIdAndColor(@Param("productId") int productId, @Param("productColor") String productColor);

    int getUserPoint(int userNo);

    void updateUserPoint(@Param("userNo") int userNo, @Param("remainingPoints") int remainingPoints); // 포인트 차감

    // 현재 productId를 기반으로 BLOB 데이터를 가져오는 메서드
    byte[] getProductImageById(int productId);

    void updateProductDetail(ProductDTO productDTO);

    int updateProduct(ProductDTO productDTO);

    InputStream getExistingProductImage(int productId);

    int deleteProductDetail(Long productId, String productColor);

    int countProductDetails(Long productId);

    ProductDTO getProductById(int productId);

     int deleteReview(@Param("reviewNo") int reviewNo);

  

    



}
