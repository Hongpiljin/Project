package com.rental.dto;

import java.sql.Timestamp;

public class UsedCarpaymentDetailDTO {
    private String vehicleNo; // 차량 번호
    private int paymentNo; // 결제 번호
    private Timestamp paymentDate; // 결제 일자
    private int paymentAmount; // 결제 금액 (int 타입)
    private int userNo;

    public UsedCarpaymentDetailDTO() {
    }

    public UsedCarpaymentDetailDTO(String vehicleNo, int paymentNo, Timestamp paymentDate, int paymentAmount) {
        this.vehicleNo = vehicleNo;
        this.paymentNo = paymentNo;
        this.paymentDate = paymentDate;
        this.paymentAmount = paymentAmount;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public int getPaymentNo() {
        return paymentNo;
    }

    public void setPaymentNo(int paymentNo) {
        this.paymentNo = paymentNo;
    }

    public Timestamp getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Timestamp paymentDate) {
        this.paymentDate = paymentDate;
    }

    public int getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(int paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    @Override
    public String toString() {
        return "UsedCarpaymentDetailDTO [vehicleNo=" + vehicleNo + ", paymentNo=" + paymentNo + ", paymentDate="
                + paymentDate + ", paymentAmount=" + paymentAmount + ", userNo=" + userNo + "]";
    }

}
