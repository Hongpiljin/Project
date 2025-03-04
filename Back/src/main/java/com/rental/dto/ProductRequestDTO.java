package com.rental.dto;

import java.util.List;

public class ProductRequestDTO {
    
    private String productName;
    private String categoryMain;
    private String categorySub;
    private String categoryDetail;
    private double productPrice;
    private String productImage;

    private List<ProductDetailDTO> productDetails; // ✅ 여러 개의 색상, 재고, 지점 저장

    public ProductRequestDTO() {}

    public ProductRequestDTO(String productName, String categoryMain, String categorySub,
                             String categoryDetail, double productPrice, String productImage,
                             List<ProductDetailDTO> productDetails) {
        this.productName = productName;
        this.categoryMain = categoryMain;
        this.categorySub = categorySub;
        this.categoryDetail = categoryDetail;
        this.productPrice = productPrice;
        this.productImage = productImage;
        this.productDetails = productDetails;
    }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getCategoryMain() { return categoryMain; }
    public void setCategoryMain(String categoryMain) { this.categoryMain = categoryMain; }

    public String getCategorySub() { return categorySub; }
    public void setCategorySub(String categorySub) { this.categorySub = categorySub; }

    public String getCategoryDetail() { return categoryDetail; }
    public void setCategoryDetail(String categoryDetail) { this.categoryDetail = categoryDetail; }

    public double getProductPrice() { return productPrice; }
    public void setProductPrice(double productPrice) { this.productPrice = productPrice; }

    public String getProductImage() { return productImage; }
    public void setProductImage(String productImage) { this.productImage = productImage; }

    public List<ProductDetailDTO> getProductDetails() { return productDetails; }
    public void setProductDetails(List<ProductDetailDTO> productDetails) { this.productDetails = productDetails; }

    @Override
    public String toString() {
        return "ProductRequestDTO{" +
                "productName='" + productName + '\'' +
                ", categoryMain='" + categoryMain + '\'' +
                ", categorySub='" + categorySub + '\'' +
                ", categoryDetail='" + categoryDetail + '\'' +
                ", productPrice=" + productPrice +
                ", productImage='" + productImage + '\'' +
                ", productDetails=" + productDetails +
                '}';
    }
}
