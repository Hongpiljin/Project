package com.rental.dto;

import java.sql.Blob;

public class RentalCarImageDTO {

    private Long imageId;          // 이미지 고유 ID
    private String rentalCarNo;    // 차량 ID (외래키)
    private byte[] carImage;         // 이미지 데이터 (BLOB)
    private String mainImageStatus; // 메인 이미지 여부 ('Y', 'N')

    // 기본 생성자
    public RentalCarImageDTO() {}

    // 매개변수가 있는 생성자
    public RentalCarImageDTO(Long imageId, String rentalCarNo, byte[] carImage, String mainImageStatus) {
        this.imageId = imageId;
        this.rentalCarNo = rentalCarNo;
        this.carImage = carImage;
        this.mainImageStatus = mainImageStatus;
    }

    // Getter & Setter
    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public String getRentalCarNo() {
        return rentalCarNo;
    }

    public void setRentalCarNo(String rentalCarNo) {
        this.rentalCarNo = rentalCarNo;
    }

    public byte[] getCarImage() {
        return carImage;
    }

    public void setCarImage(byte[] carImage) {
        this.carImage = carImage;
    }

    public String getMainImageStatus() {
        return mainImageStatus;
    }

    public void setMainImageStatus(String mainImageStatus) {
        this.mainImageStatus = mainImageStatus;
    }

    @Override
    public String toString() {
        return "RentalCarImageDTO{" +
                "imageId=" + imageId +
                ", rentalCarNo='" + rentalCarNo + '\'' +
                ", carImage=" + carImage +
                ", mainImageStatus='" + mainImageStatus + '\'' +
                '}';
    }
}
