package com.rental.controller;



import com.rental.dto.ProductDTO;
import com.rental.dto.ProductDetailDTO;
import com.rental.service.ProductService;



import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/admin/shopping")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminShoppingController {

    private final ProductService productService;

    // ✅ 상품 목록 조회 API (반드시 존재해야 함)
    @GetMapping("/list")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();

        // ✅ 데이터 확인용 로그 출력
        // System.out.println("상품 목록 조회 결과: " + products);
        

        return ResponseEntity.ok(products);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insertProduct(
            @RequestParam("productName") String productName,
            @RequestParam("categoryMain") String categoryMain,
            @RequestParam("categorySub") String categorySub,
            @RequestParam("categoryDetail") String categoryDetail,
            @RequestParam("productPrice") double productPrice,
            @RequestParam(value = "productImage", required = false) String productImageBase64,
            @RequestParam MultiValueMap<String, String> productDetails) {
        try {
            // ✅ 상품 기본 정보 설정
            ProductDTO productDTO = new ProductDTO();
            productDTO.setProductName(productName);
            productDTO.setCategoryMain(categoryMain);
            productDTO.setCategorySub(categorySub);
            productDTO.setCategoryDetail(categoryDetail);
            productDTO.setProductPrice(productPrice);

            // ✅ Base64 -> InputStream 변환
            if (productImageBase64 != null && !productImageBase64.isEmpty()) {
                byte[] decodedBytes = Base64.getDecoder().decode(productImageBase64);
                InputStream inputStream = new ByteArrayInputStream(decodedBytes);
                productDTO.setProductImage(inputStream);
            }

            // ✅ 색상, 재고, 지점 정보 파싱
            List<ProductDetailDTO> productColors = new ArrayList<>();
            int index = 0;
            while (productDetails.containsKey("productColor_" + index)) {
                ProductDetailDTO detailDTO = new ProductDetailDTO();
                detailDTO.setProductColor(productDetails.getFirst("productColor_" + index));
                detailDTO.setProductCount(Integer.parseInt(productDetails.getFirst("productCount_" + index)));
                detailDTO.setStoreLocation(productDetails.getFirst("storeLocation_" + index));
                productColors.add(detailDTO);
                index++;
            }

            productDTO.setProductColors(productColors);

            // ✅ 상품 등록
            int count = productService.insertProduct(productDTO);
            return ResponseEntity.ok("상품 등록 성공 (등록된 개수: " + count + ")");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("상품 등록 중 오류 발생: " + e.getMessage());
        }
    }

    @PutMapping("/update")
public ResponseEntity<String> updateProduct(
        @RequestParam("productId") int productId,
        @RequestParam("productName") String productName,
        @RequestParam("categoryMain") String categoryMain,
        @RequestParam("categorySub") String categorySub,
        @RequestParam("categoryDetail") String categoryDetail,
        @RequestParam("productPrice") double productPrice,
        @RequestParam("productCount") int productCount,
        @RequestParam("productColor") String productColor,
        @RequestParam("storeLocation") String storeLocation,
        @RequestParam(value = "productImage", required = false) String productImageBase64) {
    try {
        // ✅ 상품 정보 설정
        ProductDTO productDTO = new ProductDTO();
        productDTO.setProductId(productId);
        productDTO.setProductName(productName);
        productDTO.setCategoryMain(categoryMain);
        productDTO.setCategorySub(categorySub);
        productDTO.setCategoryDetail(categoryDetail);
        productDTO.setProductPrice(productPrice);

        // ✅ Base64 -> InputStream 변환
        if (productImageBase64 != null && !productImageBase64.isEmpty()) {
            byte[] decodedBytes = Base64.getDecoder().decode(productImageBase64);
            InputStream inputStream = new ByteArrayInputStream(decodedBytes);
            productDTO.setProductImage(inputStream);
        }

        // ✅ 상품 업데이트
        int count = productService.updateProduct(productDTO);
        return ResponseEntity.ok("상품 수정 성공 (수정된 개수: " + count + ")");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("상품 수정 중 오류 발생: " + e.getMessage());
    }
}

    // 상품 삭제
    @DeleteMapping("/delete/{productId}/{productColor}")
public ResponseEntity<String> deleteProduct(
        @PathVariable Long productId, 
        @PathVariable String productColor) {
    try {
        int deletedRows = productService.deleteProduct(productId, productColor);

        if (deletedRows > 0) {
            return ResponseEntity.ok("상품이 삭제되었습니다.");
        } else {
            return ResponseEntity.status(404).body("해당 상품을 찾을 수 없습니다.");
        }
    } catch (Exception e) {
        return ResponseEntity.status(500).body("상품 삭제 중 오류 발생: " + e.getMessage());
    }
}

    @GetMapping("/{productId}/{productColor}")
    public ResponseEntity<ProductDTO> getProductDetail(@PathVariable int productId, @PathVariable String productColor) {
        ProductDTO product = productService.getProductByIdAndColor(productId, productColor);
    
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    
        // ✅ BLOB 데이터를 Base64로 변환
        if (product.getProductImage() != null) {
            try {
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                InputStream inputStream = product.getProductImage();
                byte[] buffer = new byte[8192];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
                String base64Image = Base64.getEncoder().encodeToString(outputStream.toByteArray());
                product.setProductImageBase64(base64Image); // ✅ Base64 변환 데이터 추가
    
                // 🚀 디버깅 로그 추가
                // System.out.println("✅ 변환된 Base64 이미지 길이: " + base64Image.length());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    
        // System.out.println("✅ 최종 응답 데이터: " + product);
        return ResponseEntity.ok(product);
    }

}
