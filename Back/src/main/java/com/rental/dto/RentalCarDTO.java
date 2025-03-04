package com.rental.dto;

import java.sql.Timestamp;

public class RentalCarDTO {
  private String rentalCarNo;
  private String model;
  private double pricePerDay;
  private double hourlyPrice;
  private String type;
  private String location;
  private String fuel;
  private String transmission;
  private Timestamp registerDate;
  private Timestamp lastUpdated;
  private int status;
  private int manufactureYear;
  private String plateNumber;
  private double insuranceFee;
  

  public RentalCarDTO() {
  }

  public RentalCarDTO(String rentalCarNo, String model, double pricePerDay, double hourlyPrice, String type,
      String location, String fuel, String transmission,
      Timestamp registerDate, Timestamp lastUpdated, int status, int manufactureYear,
      String plateNumber, double insuranceFee) {
    this.rentalCarNo = rentalCarNo;
    this.model = model;
    this.pricePerDay = pricePerDay;
    this.hourlyPrice = hourlyPrice;
    this.type = type;
    this.location = location;
    this.fuel = fuel;
    this.transmission = transmission;
    this.registerDate = registerDate;
    this.lastUpdated = lastUpdated;
    this.status = status;
    this.manufactureYear = manufactureYear;
    this.plateNumber = plateNumber;
    this.insuranceFee = insuranceFee;
  }

  public String getRentalCarNo() {
    return rentalCarNo;
  }

  public void setRentalCarNo(String rentalCarNo) {
    this.rentalCarNo = rentalCarNo;
  }

  public String getModel() {
    return model;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public double getPricePerDay() {
    return pricePerDay;
  }

  public void setPricePerDay(double pricePerDay) {
    this.pricePerDay = pricePerDay;
  }

  public double getHourlyPrice() {
    return hourlyPrice;
  }

  public void setHourlyPrice(double hourlyPrice) {
    this.hourlyPrice = hourlyPrice;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public String getFuel() {
    return fuel;
  }

  public void setFuel(String fuel) {
    this.fuel = fuel;
  }

  public String getTransmission() {
    return transmission;
  }

  public void setTransmission(String transmission) {
    this.transmission = transmission;
  }

  public Timestamp getRegisterDate() {
    return registerDate;
  }

  public void setRegisterDate(Timestamp registerDate) {
    this.registerDate = registerDate;
  }

  public Timestamp getLastUpdated() {
    return lastUpdated;
  }

  public void setLastUpdated(Timestamp lastUpdated) {
    this.lastUpdated = lastUpdated;
  }

  public int isStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public int getManufactureYear() {
    return manufactureYear;
  }

  public void setManufactureYear(int manufactureYear) {
    this.manufactureYear = manufactureYear;
  }

  public String getPlateNumber() {
    return plateNumber;
  }

  public void setPlateNumber(String plateNumber) {
    this.plateNumber = plateNumber;
  }

  public double getInsuranceFee() {
    return insuranceFee;
  }

  public void setInsuranceFee(double insuranceFee) {
    this.insuranceFee = insuranceFee;
  }

  @Override
  public String toString() {
    return "RentalCarDTO{" +
        "rentalCarNo='" + rentalCarNo + '\'' +
        ", model='" + model + '\'' +
        ", pricePerDay=" + pricePerDay +
        ", hourlyPrice=" + hourlyPrice +
        ", type='" + type + '\'' +
        ", location='" + location + '\'' +
        ", fuel='" + fuel + '\'' +
        ", transmission='" + transmission + '\'' +
        ", registerDate=" + registerDate +
        ", lastUpdated=" + lastUpdated +
        ", status=" + status +
        ", manufactureYear=" + manufactureYear +
        ", plateNumber='" + plateNumber + '\'' +
        ", insuranceFee=" + insuranceFee +
        '}';
  }

}
