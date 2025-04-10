package com.rental.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UsedCarImageDTO {
    private int imageId; // 이미지 ID
    private String vehicleNo; // 차량 번호
    private byte[] imageData; // 이미지 데이터
    private String imageType; // 이미지 타입 (예: "image/png")
    private String mainImageStatus; // 대표 이미지 여부 (Y/N)

    // 기본 생성자
    public UsedCarImageDTO() {
    }

    // 매개변수 생성자
    public UsedCarImageDTO(int imageId, String vehicleNo, byte[] imageData, String imageType, String mainImageStatus) {
        this.imageId = imageId;
        this.vehicleNo = vehicleNo;
        this.imageData = imageData;
        this.imageType = imageType;
        this.mainImageStatus = mainImageStatus;
    }

    // Getter and Setter
    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public String getMainImageStatus() {
        return mainImageStatus;
    }

    public void setMainImageStatus(String mainImageStatus) {
        this.mainImageStatus = mainImageStatus;
    }

    // isNew() 메서드: imageId가 0이면 새 이미지로 간주
    public boolean isNew() {
        return this.imageId == 0;
    }

    // toString() 메서드 (디버깅용)
    @Override
    public String toString() {
        return "UsedCarImageDTO [imageId=" + imageId + ", vehicleNo=" + vehicleNo +
                ", imageData=" + (imageData != null ? "[BINARY DATA]" : "null") +
                ", imageType=" + imageType + ", mainImageStatus=" + mainImageStatus + "]";
    }
}
