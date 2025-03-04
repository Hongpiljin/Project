package com.rental.dto;

import java.util.Base64;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class UsedCarDTO {

    private String vehicleName;    
    private String vehicleNo;      
    private int dealerNo;          
    private String vehicleType;    
    private String brand;          
    private int modelYear;         
    private int price;             
    private String color;          
    private String dealerLocation; 
    private String fuelType;       
    private String transmission;   
    private String driveType;      
    private byte[] mainImage;      // ✅ BLOB 데이터 (DB 저장)
    private String base64MainImage; // ✅ Base64 변환 후 클라이언트에 전달할 필드
    private String vehiclePlate;   
    private int carKm;             
    private int seatingCapacity;   
    private String description;    
    private int status;            

    private List<UsedCarImageDTO> usedCarImages;  
    private List<String> deletedImages;  

    // ✅ 기본 생성자
    public UsedCarDTO() {}

    // ✅ Base64 변환 후 저장 (mainImage → base64MainImage)
    public void ensureBase64MainImage() {
        if (this.mainImage != null && this.mainImage.length > 0) {
            this.base64MainImage = "data:image/png;base64," + Base64.getEncoder().encodeToString(this.mainImage);
        } else {
            this.base64MainImage = null; // ✅ BLOB 데이터가 없으면 null 유지
        }
    }

    private List<Long> deletedImageIds;

    public List<Long> getDeletedImageIds() {
        return deletedImageIds;
    }

    public void setDeletedImageIds(List<Long> deletedImageIds) {
        this.deletedImageIds = deletedImageIds;
    }


    // ✅ Getter & Setter
    public byte[] getMainImage() {
        return mainImage;
    }

    public void setMainImage(byte[] mainImage) {
        this.mainImage = mainImage;
    }

    public String getBase64MainImage() {
        return base64MainImage;
    }

    public void setBase64MainImage(String base64MainImage) {
        this.base64MainImage = base64MainImage;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public int getDealerNo() {
        return dealerNo;
    }

    public void setDealerNo(int dealerNo) {
        this.dealerNo = dealerNo;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public int getModelYear() {
        return modelYear;
    }

    public void setModelYear(int modelYear) {
        this.modelYear = modelYear;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDealerLocation() {
        return dealerLocation;
    }

    public void setDealerLocation(String dealerLocation) {
        this.dealerLocation = dealerLocation;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getDriveType() {
        return driveType;
    }

    public void setDriveType(String driveType) {
        this.driveType = driveType;
    }

    public String getVehiclePlate() {
        return vehiclePlate;
    }

    public void setVehiclePlate(String vehiclePlate) {
        this.vehiclePlate = vehiclePlate;
    }

    public int getCarKm() {
        return carKm;
    }

    public void setCarKm(int carKm) {
        this.carKm = carKm;
    }

    public int getSeatingCapacity() {
        return seatingCapacity;
    }

    public void setSeatingCapacity(int seatingCapacity) {
        this.seatingCapacity = seatingCapacity;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<UsedCarImageDTO> getUsedCarImages() {
        return usedCarImages;
    }

    public void setUsedCarImages(List<UsedCarImageDTO> usedCarImages) {
        this.usedCarImages = usedCarImages;
    }

    public List<String> getDeletedImages() {
        return deletedImages;
    }

    public void setDeletedImages(List<String> deletedImages) {
        this.deletedImages = deletedImages;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // ✅ `toString()`에서 BLOB 직접 변환하지 않고 base64MainImage 사용
    @Override
    public String toString() {
        return "UsedCarDTO{" +
                "vehicleName='" + vehicleName + '\'' +
                ", vehicleNo='" + vehicleNo + '\'' +
                ", dealerNo=" + dealerNo +
                ", vehicleType='" + vehicleType + '\'' +
                ", brand='" + brand + '\'' +
                ", modelYear=" + modelYear +
                ", price=" + price +
                ", color='" + color + '\'' +
                ", dealerLocation='" + dealerLocation + '\'' +
                ", fuelType='" + fuelType + '\'' +
                ", transmission='" + transmission + '\'' +
                ", driveType='" + driveType + '\'' +
                ", base64MainImage='" + base64MainImage + '\'' + // ✅ Base64 데이터만 포함
                ", vehiclePlate='" + vehiclePlate + '\'' +
                ", carKm=" + carKm +
                ", seatingCapacity=" + seatingCapacity +
                ", usedCarImages=" + usedCarImages +
                ", deletedImages=" + deletedImages +
                ", description='" + description + '\'' +
                '}';
    }
}
