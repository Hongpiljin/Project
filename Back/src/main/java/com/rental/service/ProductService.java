package com.rental.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rental.dto.ProductDTO;
import com.rental.dto.ProductDetailDTO;
import com.rental.dto.ReviewDTO;
import com.rental.dto.ShoppingPaymentDTO;
import com.rental.dto.ShoppingPaymentDetailDTO;
import com.rental.mapper.MyPageMapper;
import com.rental.mapper.ProductMapper;

@Service
public class ProductService {

    private final ProductMapper mapper;
    private final MyPageMapper mypageMapper;

    @Autowired
    public ProductService(ProductMapper mapper, MyPageMapper mypageMapper) {
        this.mapper = mapper;
        this.mypageMapper = mypageMapper;
    }


    public int addReview(ReviewDTO reviewDTO) {
        return mapper.insertReview(reviewDTO);
    }

    public List<ReviewDTO> getReviewsByProductId(int productId) {
        return mapper.getReviewsByProductId(productId);
    }

    public List<ProductDTO> getAllProducts() {
        List<ProductDTO> products = mapper.getAllProductsWithDetails();
        
        // ✅ 데이터 확인용 로그 출력
        // System.out.println("서비스 계층 - 상품 목록: " + products);

        return products;
    }
        
    


    public String getBase64Image(int productId) {
        System.out.println("🛠️ getBase64Image 호출 - productId: " + productId);
        ProductDTO product = mapper.getProductById(productId);
    
        if (product == null) {
            System.out.println("❌ 제품을 찾을 수 없음 - productId: " + productId);
            return getDefaultImage(); // 기본 이미지 반환
        }
    
        if (product.getProductImage() == null) {
            System.out.println("❌ BLOB 이미지가 없음 - productId: " + productId);
            return getDefaultImage(); // 기본 이미지 반환
        }
    
        try {
            String base64Image = convertInputStreamToBase64(product.getProductImage());
            System.out.println("✅ Base64 변환 완료 - productId: " + productId + " | 길이: " + base64Image.length());
            return base64Image;
        } catch (Exception e) {
            System.out.println("⚠️ Base64 변환 중 오류 발생 - productId: " + productId);
            e.printStackTrace();
            return getDefaultImage(); // 변환 오류 시 기본 이미지 반환
        }
    }
    
    // ✅ 기본 이미지 반환 (Base64 인코딩된 투명한 1px 이미지)
    private String getDefaultImage() {
        return "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/knuIAAAAABJRU5ErkJggg==";
    }
    

    public List<ProductDTO> selectProducts(Map<String, Object> params) {
        List<ProductDTO> products = mapper.selectProducts(params);
    
        for (ProductDTO product : products) {
            if (product.getProductImage() != null) {
                try {
                    product.setProductImageBase64(convertInputStreamToBase64(product.getProductImage()));
                    System.out.println("✅ Base64 변환 성공! 길이: " + product.getProductImageBase64().length());
                    product.setProductImage(null); // ✅ InputStream을 null로 설정하여 메모리 관리
                } catch (Exception e) {
                    System.err.println("❌ Base64 변환 실패! Product ID: " + product.getProductId());
                    e.printStackTrace();
                }
            }
        }
        return products;
    }
    
    
    

    // ✅ InputStream을 Base64로 변환하는 메서드 복구
    private String convertInputStreamToBase64(InputStream inputStream) {
    if (inputStream == null) {
        return null;
    }
    try {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[8192];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        return Base64.getEncoder().encodeToString(outputStream.toByteArray());
    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}


@Transactional
public int processPayment(List<ShoppingPaymentDetailDTO> cartItems, int userNo) {
    // 1️⃣ 결제 번호 생성
    int paymentNo = mapper.getNextPaymentNo();

    // 2️⃣ shopping_payment 테이블에 저장
    ShoppingPaymentDTO payment = new ShoppingPaymentDTO(paymentNo, userNo);
    mapper.insertShoppingPayment(payment);

    // 3️⃣ 각 결제 항목 처리
    for (ShoppingPaymentDetailDTO item : cartItems) {
        int productId = item.getProductId();
        String productColor = item.getProductColor();

        // 3.1️⃣ 해당 색상의 상품 재고 확인
        Integer stock = mapper.getProductStock(productId, productColor);
        if (stock == null || stock < item.getProductCount()) {
            throw new RuntimeException("재고가 부족합니다.");
        }

        // 3.2️⃣ 재고 차감
        mapper.updateProductStock(productId, productColor, item.getProductCount());

        // 3.3️⃣ shopping_payment_detail 테이블에 저장
        item.setPaymentNo(paymentNo);
        item.setUserNo(userNo);
        mapper.insertShoppingPaymentDetail(item);
    }

    // 4️⃣ 결제 후 포인트 차감
    updateUserPoints(userNo, cartItems);

    return paymentNo;
}



    private void updateUserPoints(int userNo, List<ShoppingPaymentDetailDTO> cartItems) {
        int totalAmount = cartItems.stream()
                .mapToInt(item -> item.getProductAllPrice() * item.getProductCount())
                .sum();

        // 사용자 포인트 조회
        int userPoint = mapper.getUserPoint(userNo);
        int remainingPoints = userPoint - totalAmount;

        // 포인트 업데이트
        if (remainingPoints >= 0) {
            mapper.updateUserPoint(userNo, remainingPoints);
        } else {
            throw new RuntimeException("포인트가 부족합니다.");
        }
    }

    // 재고 확인 메서드 (색상도 포함)
    public boolean checkStockAvailability(int productId, String productColor, int productCount) {
        Integer stock = mapper.getProductStock(productId, productColor); // 색상도 포함하여 재고 조회
        return stock != null && stock >= productCount; // 재고가 충분하면 true 반환
    }

    @Transactional
public int updateProduct(ProductDTO productDTO) {
    if (productDTO.getProductImage() == null) {
        // ✅ Base64를 보내지 않았으면 기존 이미지 유지
        productDTO.setProductImage(mapper.getExistingProductImage(productDTO.getProductId()));
    }
    return mapper.updateProduct(productDTO);
}

@Transactional
public int deleteProduct(Long productId, String productColor) {
    // ✅ 1. PRODUCT_DETAIL 테이블에서 해당 색상 상품 삭제
    int result = mapper.deleteProductDetail(productId, productColor);

    // ✅ 2. PRODUCT_DETAIL에 해당 productId가 더 이상 없으면 PRODUCT 테이블에서도 삭제
    int remainingDetails = mapper.countProductDetails(productId);
    if (remainingDetails == 0) {
        mapper.deleteProduct(productId);
    }

    return result;
}
public List<ProductDetailDTO> getProductDetailsByProductId(int productId) {
    List<ProductDetailDTO> details = mapper.getProductDetailsByProductId(productId);
    return details;
}


    public ProductDTO getProductByIdAndColor(int productId, String productColor) {
        ProductDetailDTO detail = mapper.getProductByIdAndColor(productId, productColor);
        if (detail == null) return null;
    
        ProductDTO product = new ProductDTO();
        product.setProductId(detail.getProductId());
        product.setProductName(detail.getProductName());
        product.setCategoryMain(detail.getCategoryMain());
        product.setCategorySub(detail.getCategorySub());
        product.setCategoryDetail(detail.getCategoryDetail());
        product.setProductPrice(detail.getProductPrice());
        product.setProductCount(detail.getProductCount());
        product.setProductColor(detail.getProductColor());
        product.setStoreLocation(detail.getStoreLocation());
        product.setProductImage(detail.getProductImage()); // ✅ InputStream 그대로 유지
    
        // 🚀 디버깅 로그 추가
        // System.out.println("✅ 상품 상세 정보: " + product);
    
        return product;
    }
    
    

  




     // ✅ 리뷰 삭제 (reviewNo로 삭제)
     public void deleteReview(int reviewNo) {
        int deletedCount = mapper.deleteReview(reviewNo);
        
        if (deletedCount == 0) {
            throw new RuntimeException("삭제할 리뷰가 존재하지 않습니다.");
        }
    }


    public int insertProduct(ProductDTO productDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'insertProduct'");
    }
}



