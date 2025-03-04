package com.rental.dto;

public class ShoppingPaymentDetailDTO {
    private int paymentNo;      // 결제 번호
    private int userNo;         // 사용자 번호
    private int productId;      // 상품 번호
    private String productName; // 상품명
    private int productAllPrice; // ✅ 총 가격 필드 추가 (이 부분이 에러 원인일 가능성 있음)
    private int productCount;   // 구매 개수
    private String productColor; // ✅ 상품 색상 필드 추가 (이 부분이 에러 원인일 가능성 있음)

    // 기본 생성자
    public ShoppingPaymentDetailDTO() {}

    // 모든 필드를 포함하는 생성자
    public ShoppingPaymentDetailDTO(int paymentNo, int userNo, int productId, String productName,
                                    int productAllPrice, int productCount, String productColor) {
        this.paymentNo = paymentNo;
        this.userNo = userNo;
        this.productId = productId;
        this.productName = productName;
        this.productAllPrice = productAllPrice;
        this.productCount = productCount;
        this.productColor = productColor;
    }

    // ✅ Getter & Setter 추가
    public int getPaymentNo() { return paymentNo; }
    public void setPaymentNo(int paymentNo) { this.paymentNo = paymentNo; }

    public int getUserNo() { return userNo; }
    public void setUserNo(int userNo) { this.userNo = userNo; }

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public int getProductAllPrice() { return productAllPrice; } // ✅ 에러 방지
    public void setProductAllPrice(int productAllPrice) { this.productAllPrice = productAllPrice; }

    public int getProductCount() { return productCount; }
    public void setProductCount(int productCount) { this.productCount = productCount; }

    public String getProductColor() { return productColor; } // ✅ 에러 방지
    public void setProductColor(String productColor) { this.productColor = productColor; }

    // toString() (디버깅용)
    @Override
    public String toString() {
        return "ShoppingPaymentDetailDTO{" +
                "paymentNo=" + paymentNo +
                ", userNo=" + userNo +
                ", productId=" + productId +
                ", productName='" + productName + '\'' +
                ", productAllPrice=" + productAllPrice +
                ", productCount=" + productCount +
                ", productColor='" + productColor + '\'' +
                '}';
    }
}
