package com.rental.controller;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rental.dto.ProductDTO;
import com.rental.dto.ProductDetailDTO;
import com.rental.dto.ReviewDTO;
import com.rental.dto.ShoppingPaymentDetailDTO;
import com.rental.service.MyPageService;
import com.rental.service.ProductService;
import com.rental.service.UserService;
import com.rental.token.TokenProvider;

import io.jsonwebtoken.Claims;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ShoppingController {

    private final TokenProvider tokenProvider;
    private final ProductService productService;
    private final UserService userService;
    private final MyPageService mypageService;

    @Autowired
    public ShoppingController(TokenProvider tokenProvider, ProductService productService, UserService userService,
            MyPageService mypageService) {
        this.tokenProvider = tokenProvider;
        this.productService = productService;
        this.userService = userService;
        this.mypageService = mypageService;
    }

    @GetMapping("/shopping")
public ResponseEntity<List<ProductDTO>> getProducts(
        @RequestParam(required = false) String categoryMain,
        @RequestParam(required = false) String categorySub,
        @RequestParam(required = false) String categoryDetail,
        @RequestParam(defaultValue = "1") int page, // ✅ 기본 페이지: 1
        @RequestParam(defaultValue = "16") int limit) { // ✅ 한 번에 가져올 개수: 16

    System.out.println("categoryMain: " + categoryMain);
    System.out.println("categorySub: " + categorySub);
    System.out.println("categoryDetail: " + categoryDetail);
    System.out.println("현재 페이지: " + page + ", 한 페이지당 개수: " + limit);

    // ✅ OFFSET 계산 (예: page=1이면 OFFSET=0, page=2이면 OFFSET=16)
    int offset = (page - 1) * limit;

    Map<String, Object> params = new HashMap<>();
    params.put("categoryMain", categoryMain);
    params.put("categorySub", categorySub);
    params.put("categoryDetail", categoryDetail);
    params.put("limit", limit);
    params.put("offset", offset);

    List<ProductDTO> products = productService.selectProducts(params);
    System.out.println("products: " + products);
    
    return ResponseEntity.ok(products);
}

    
    

    @PostMapping("/shopping/product/{productId}/review")
    public ResponseEntity<Map<String, Object>> addReview(
            @PathVariable int productId,
            @RequestBody ReviewDTO reviewDTO,
            @CookieValue(value = "token", required = false) String token) {
        Map<String, Object> response = new HashMap<>();

        if (token == null || !tokenProvider.isValidToken(token)) {
            response.put("code", 2);
            response.put("msg", "유효하지 않은 토큰입니다. 로그인이 필요합니다.");
            return ResponseEntity.badRequest().body(response);
        }

        // 토큰에서 클레임 추출
        Claims claims = tokenProvider.getClaims(token);
        String userId = claims.get("userId", String.class);

        if (userId == null) {
            response.put("code", 3);
            response.put("msg", "토큰에서 사용자 정보를 추출할 수 없습니다.");
            return ResponseEntity.badRequest().body(response);
        }

        Integer userNo = userService.getUserNoByUserId(userId);
        if (userNo == null) {
            response.put("code", 4);
            response.put("msg", "존재하지 않는 사용자입니다.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            reviewDTO.setProductId(productId);
            reviewDTO.setUserNo(userNo);
            reviewDTO.setUserId(userId);
            productService.addReview(reviewDTO);

            response.put("code", 1);
            response.put("msg", "리뷰가 성공적으로 추가되었습니다.");
        } catch (Exception e) {
            response.put("code", 5);
            response.put("msg", "리뷰 추가 중 오류가 발생했습니다.");
        }

        return ResponseEntity.ok(response);
    }

    // ✅ 리뷰 삭제 API
     // ✅ 리뷰 삭제 API (reviewNo 사용)
     @DeleteMapping("shopping/review/{reviewNo}")
     public ResponseEntity<?> deleteReview(@PathVariable int reviewNo) {
         try {
             productService.deleteReview(reviewNo);
             return ResponseEntity.ok().body("리뷰가 삭제되었습니다.");
         } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 삭제 중 오류 발생");
         }
     }

    @GetMapping("/shopping/product/{productId}")
    public ResponseEntity<List<ReviewDTO>> getReviews(@PathVariable int productId) {
        List<ReviewDTO> reviews = productService.getReviewsByProductId(productId);
        for (ReviewDTO review : reviews) {
            System.out.println("Review: " + review);
        }
        return ResponseEntity.ok(reviews);
    }

    // ✅ 특정 제품의 상세 정보 가져오기 (product + product_detail)
    @GetMapping("/shopping/product/{productId}/details")
    public List<ProductDetailDTO> getProductDetails(@PathVariable int productId) {
        System.out.println("🔍 요청받음: /shopping/product/" + productId + "/details"); // ✅ 로그 추가
        return productService.getProductDetailsByProductId(productId);
    }

     
     // ✅ 결제 요청 API
     @PostMapping("/shopping/payment")
     public ResponseEntity<Map<String, Object>> processPayment(
             @CookieValue(value = "token", required = false) String token,
             @RequestBody List<ShoppingPaymentDetailDTO> cartItems) {
 
         System.out.println("📌 [결제 요청] /shopping/payment 호출됨");
         System.out.println("📦 요청된 결제 상품 목록: " + cartItems);
 
         if (token == null) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                     .body(Collections.singletonMap("error", "토큰이 포함되지 않았습니다."));
         }
 
         if (!tokenProvider.isValidToken(token)) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                     .body(Collections.singletonMap("error", "토큰이 유효하지 않습니다."));
         }
 
         // 토큰에서 사용자 정보 추출
         Claims claims = tokenProvider.getClaims(token);
         String userId = claims.get("userId", String.class);
         Integer userNo = userService.getUserNoByUserId(userId);
 
         if (userNo == null) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                     .body(Collections.singletonMap("error", "존재하지 않는 사용자입니다."));
         }
 
         if (cartItems == null || cartItems.isEmpty()) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                     .body(Collections.singletonMap("error", "결제 항목이 비어 있습니다."));
         }
 
         try {
             // ✅ 결제 처리 수행 (상품 번호 + 색상 기준으로 처리)
             int paymentNo = productService.processPayment(cartItems, userNo);
             System.out.println("✅ 결제 처리 완료 - 결제번호: " + paymentNo);
 
             // ✅ JSON 형식으로 반환
             Map<String, Object> response = new HashMap<>();
             response.put("paymentNo", paymentNo);
             return ResponseEntity.ok(response);
 
         } catch (Exception e) {
             e.printStackTrace();
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                     .body(Collections.singletonMap("error", "결제 처리 중 오류 발생: " + e.getMessage()));
         }
     }

    @GetMapping("/shopping/user/info")
    public ResponseEntity<Map<String, Object>> getUserInfo(
            @CookieValue(value = "token", required = false) String token) {
        System.out.println("📌 [API 요청] /shopping/user/info 호출됨");

        if (token == null) {
            System.out.println("⚠️ 토큰이 포함되지 않음");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "토큰이 필요합니다."));
        }

        if (!tokenProvider.isValidToken(token)) {
            System.out.println("❌ 유효하지 않은 토큰");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "토큰이 유효하지 않습니다."));
        }

        Claims claims = tokenProvider.getClaims(token);
        String userId = claims.get("userId", String.class);
        Integer userNo = userService.getUserNoByUserId(userId);
        System.out.println("📌 추출된 userNo 값: " + userNo);

        if (userNo == null) {
            System.out.println("❌ userNo 조회 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "존재하지 않는 사용자입니다."));
        }

        Map<String, Object> userInfo = mypageService.getUserInfo(userNo);
        if (userInfo != null) {
            System.out.println("✅ 사용자 정보 조회 성공: " + userInfo);
            return ResponseEntity.ok(userInfo);
        } else {
            System.out.println("❌ 사용자 정보 조회 실패: userNo=" + userNo);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "사용자 정보를 찾을 수 없습니다."));
        }
    }

     // ✅ 특정 상품의 이미지 데이터를 Base64로 디코딩하여 반환하는 API
    // 이미지 가져오기 (서비스 메서드 사용)
    @GetMapping("/shopping/product/{productId}/getImage")
    public ResponseEntity<String> getProductImage(@PathVariable int productId) {
        try {
            String base64Image = productService.getBase64Image(productId);
            return ResponseEntity.ok(base64Image);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("이미지를 가져오는 데 실패했습니다.");
        }
    }

}
