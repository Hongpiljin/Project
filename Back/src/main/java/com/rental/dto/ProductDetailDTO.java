package com.rental.dto;

import java.io.InputStream;
import java.util.List;

public class ProductDetailDTO {
    
    private int productId;
    private int productCount;
    private String productColor;
    private String storeLocation;
    private String productName;
    private InputStream productImage;  
    private double productPrice;
    private String categoryMain;  
    private String categorySub;  
    private String categoryDetail;
    private List<String> productColors;  // ✅ 여러 색상을 저장할 리스트 추가

    public ProductDetailDTO() {}

    public ProductDetailDTO(int productId, int productCount, String productColor, 
                            String storeLocation, String productName, InputStream productImage, 
                            double productPrice, String categoryMain, String categorySub, 
                            String categoryDetail, List<String> productColors) {
        this.productId = productId;
        this.productCount = productCount;
        this.productColor = productColor;
        this.storeLocation = storeLocation;
        this.productName = productName;
        this.productImage = productImage;
        this.productPrice = productPrice;
        this.categoryMain = categoryMain;
        this.categorySub = categorySub;
        this.categoryDetail = categoryDetail;
        this.productColors = productColors;
    }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public int getProductCount() { return productCount; }
    public void setProductCount(int productCount) { this.productCount = productCount; }

    public String getProductColor() { return productColor; }
    public void setProductColor(String productColor) { this.productColor = productColor; }

    public String getStoreLocation() { return storeLocation; }
    public void setStoreLocation(String storeLocation) { this.storeLocation = storeLocation; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public InputStream getProductImage() { return productImage; }
    public void setProductImage(InputStream productImage) { this.productImage = productImage; }

    public double getProductPrice() { return productPrice; }
    public void setProductPrice(double productPrice) { this.productPrice = productPrice; }

    public String getCategoryMain() { return categoryMain; }
    public void setCategoryMain(String categoryMain) { this.categoryMain = categoryMain; }

    public String getCategorySub() { return categorySub; }
    public void setCategorySub(String categorySub) { this.categorySub = categorySub; }

    public String getCategoryDetail() { return categoryDetail; }
    public void setCategoryDetail(String categoryDetail) { this.categoryDetail = categoryDetail; }

    public List<String> getProductColors() { return productColors; }
    public void setProductColors(List<String> productColors) { this.productColors = productColors; }

    @Override
    public String toString() {
        return "ProductDetailDTO{" +
                "productId=" + productId +
                ", productCount=" + productCount +
                ", productColor='" + productColor + '\'' +
                ", storeLocation='" + storeLocation + '\'' +
                ", productImage='" + productImage + '\'' +
                ", productPrice=" + productPrice +
                ", categoryMain='" + categoryMain + '\'' +
                ", categorySub='" + categorySub + '\'' +
                ", categoryDetail='" + categoryDetail + '\'' +
                ", productColors=" + productColors +
                '}';
    }

    
}
