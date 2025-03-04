package com.rental.dto;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.ToString;

@JsonInclude(JsonInclude.Include.NON_NULL) // ✅ null 값은 포함되지 않도록 설정
@ToString(exclude = "productImage")
public class ProductDTO {
    private int productId;
    private double productPrice;
    private String productName;
    private String categoryMain;
    private String categorySub;
    private String categoryDetail;

    @JsonIgnore
    private InputStream productImage; // ✅ BLOB 데이터를 저장할 
    private String productImageBase64; // Base64 문자열로 변환된 데이터

    private int productCount;
    private String productColor;
    private String storeLocation;

    private List<ProductDetailDTO> productColors; // ✅ 색상/재고 정보를 리스트로 저장


    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public double getProductPrice() { return productPrice; }
    public void setProductPrice(double productPrice) { this.productPrice = productPrice; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getCategoryMain() { return categoryMain; }
    public void setCategoryMain(String categoryMain) { this.categoryMain = categoryMain; }

    public String getCategorySub() { return categorySub; }
    public void setCategorySub(String categorySub) { this.categorySub = categorySub; }

    public String getCategoryDetail() { return categoryDetail; }
    public void setCategoryDetail(String categoryDetail) { this.categoryDetail = categoryDetail; }

    public InputStream getProductImage() { return productImage; }
    public void setProductImage(InputStream productImage) { this.productImage = productImage; }

    public int getProductCount() { return productCount; }
    public void setProductCount(int productCount) { this.productCount = productCount; }

    public String getProductColor() { return productColor; }
    public void setProductColor(String productColor) { this.productColor = productColor; }

    public String getStoreLocation() { return storeLocation; }
    public void setStoreLocation(String storeLocation) { this.storeLocation = storeLocation; }

    public List<ProductDetailDTO> getProductColors() { return productColors; }
    public void setProductColors(List<ProductDetailDTO> productColors) { this.productColors = productColors; }

    public void setProductImageBase64(String base64Image) {
        this.productImage = null; // 기존 InputStream 제거
        this.productImageBase64 = base64Image; // Base64 문자열 저장
        
    }
   // ✅ Base64 변환 메서드
   public String getProductImageBase64() {
    if (this.productImageBase64 != null) {
        return this.productImageBase64; // ✅ 이미 변환된 값이 있으면 그대로 반환
    }
    if (this.productImage == null) {
        return null; // ✅ 이미지가 없으면 null 반환
    }
    try {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[8192];
        int bytesRead;
        while ((bytesRead = this.productImage.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        this.productImageBase64 = Base64.getEncoder().encodeToString(outputStream.toByteArray());
        return this.productImageBase64;
    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}

   
}
