package com.rental.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

public class RentalReservationDTO {
  private Long reservationId; // 예약 ID
  private String rentalCarNo; // 차량 번호
  private String userId; // 사용자 ID

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private LocalDate startDate; // 대여 시작 일

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private LocalDate endDate; // 대여 종료 일
  private String startTime; // 대여 시작 시간
  private String endTime; // 대여 종료 시간
  private int totalHours; // 총 대여 시간
  private boolean insuranceIncluded; // 보험 포함 여부
  private String paymentMethod; // 결제 방식
  private double totalPrice; // 총 금액
  private int totalDays; // 총 대여 일수
  private String status; // 예약 상태
  private int extendedHours; // 연장 시간

  public RentalReservationDTO() {
  }

  public RentalReservationDTO(Long reservationId, String rentalCarNo, String userId, LocalDate startDate,
      LocalDate endDate, String startTime, String endTime, int totalHours, boolean insuranceIncluded,
      String paymentMethod,
      double totalPrice, int totalDays, String status, int extendedHours) {
    this.reservationId = reservationId;
    this.rentalCarNo = rentalCarNo;
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.totalHours = totalHours;
    this.insuranceIncluded = insuranceIncluded;
    this.paymentMethod = paymentMethod;
    this.totalPrice = totalPrice;
    this.totalDays = totalDays;
    this.status = status;
    this.extendedHours = extendedHours;
  }

  public Long getReservationId() {
    return reservationId;
  }

  public void setReservationId(Long reservationId) {
    this.reservationId = reservationId;
  }

  public String getRentalCarNo() {
    return rentalCarNo;
  }

  public void setRentalCarNo(String rentalCarNo) {
    this.rentalCarNo = rentalCarNo;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }

  public String getStartTime() {
    return startTime;
  }

  public void setStartTime(String startTime) {
    this.startTime = startTime;
  }

  public String getEndTime() {
    return endTime;
  }

  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }

  public int getTotalHours() {
    return totalHours;
  }

  public void setTotalHours(int totalHours) {
    this.totalHours = totalHours;
  }

  public boolean isInsuranceIncluded() {
    return insuranceIncluded;
  }

  public void setInsuranceIncluded(boolean insuranceIncluded) {
    this.insuranceIncluded = insuranceIncluded;
  }

  public String getPaymentMethod() {
    return paymentMethod;
  }

  public void setPaymentMethod(String paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public double getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(double totalPrice) {
    this.totalPrice = totalPrice;
  }

  public int getTotalDays() {
    return totalDays;
  }

  public void setTotalDays(int totalDays) {
    this.totalDays = totalDays;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public int getExtendedHours() {
    return extendedHours;
  }

  public void setExtendedHours(int extendedHours) {
    this.extendedHours = extendedHours;
  }

  @Override
  public String toString() {
    return "RentalReservationDTO{" +
        "reservationId=" + reservationId +
        ", rentalCarNo='" + rentalCarNo + '\'' +
        ", userId='" + userId + '\'' +
        ", startDate=" + startDate +
        ", endDate=" + endDate +
        ", startTime=" + startTime +
        ", endTime=" + endTime +
        ", totalHours=" + totalHours +
        ", insuranceIncluded=" + insuranceIncluded +
        ", paymentMethod='" + paymentMethod + '\'' +
        ", totalPrice=" + totalPrice +
        ", totalDays=" + totalDays +
        ", status='" + status + '\'' +
        ", extendedHours=" + extendedHours +
        '}';

  }

}
