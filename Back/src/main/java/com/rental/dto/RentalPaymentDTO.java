package com.rental.dto;

import java.util.Date;

public class RentalPaymentDTO {
  private long paymentId;
  private long reservationId;
  private String userId;
  private double totalPrice;
  private String paymentMethod;
  private String paymentStatus;
  private Date paymentDate;
  private Date paymentCompletedDate;
  private String refundStatus;

  public RentalPaymentDTO() {
  }

  public RentalPaymentDTO(long paymentId, long reservationId, String userId, double totalPrice,
      String paymentMethod, String paymentStatus, Date paymentDate,
      Date paymentCompletedDate, String refundStatus) {
    this.paymentId = paymentId;
    this.reservationId = reservationId;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.paymentStatus = paymentStatus;
    this.paymentDate = paymentDate;
    this.paymentCompletedDate = paymentCompletedDate;
    this.refundStatus = refundStatus;
  }

  public long getPaymentId() {
    return paymentId;
  }

  public void setPaymentId(long paymentId) {
    this.paymentId = paymentId;
  }

  public long getReservationId() {
    return reservationId;
  }

  public void setReservationId(long reservationId) {
    this.reservationId = reservationId;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public double getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(double totalPrice) {
    this.totalPrice = totalPrice;
  }

  public String getPaymentMethod() {
    return paymentMethod;
  }

  public void setPaymentMethod(String paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public String getPaymentStatus() {
    return paymentStatus;
  }

  public void setPaymentStatus(String paymentStatus) {
    this.paymentStatus = paymentStatus;
  }

  public Date getPaymentDate() {
    return paymentDate;
  }

  public void setPaymentDate(Date paymentDate) {
    this.paymentDate = paymentDate;
  }

  public Date getPaymentCompletedDate() {
    return paymentCompletedDate;
  }

  public void setPaymentCompletedDate(Date paymentCompletedDate) {
    this.paymentCompletedDate = paymentCompletedDate;
  }

  public String getRefundStatus() {
    return refundStatus;
  }

  public void setRefundStatus(String refundStatus) {
    this.refundStatus = refundStatus;
  }

  @Override
  public String toString() {
    return "RentalPaymentDTO [paymentId=" + paymentId + ", reservationId=" + reservationId + ", userId=" + userId
        + ", totalPrice=" + totalPrice + ", paymentMethod=" + paymentMethod + ", paymentStatus=" + paymentStatus
        + ", paymentDate=" + paymentDate + ", paymentCompletedDate=" + paymentCompletedDate + ", refundStatus="
        + refundStatus + "]";
  }

}
