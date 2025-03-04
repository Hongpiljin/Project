package com.rental.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Admin;
import org.springframework.stereotype.Service;

import com.rental.dto.RentalCarDTO;
import com.rental.mapper.AdminRentalCarMapper;

@Service
public class AdminRentalCarService {

    private final AdminRentalCarMapper adminRentalCarMapper;

    @Autowired
    public AdminRentalCarService(AdminRentalCarMapper adminRentalCarMapper) {
        this.adminRentalCarMapper = adminRentalCarMapper;
    }

    public List<RentalCarDTO> getAllRentalCars() {
        return adminRentalCarMapper.findAllRentalCars();
    }

    // ✅ 렌트카 정보 수정
    public void updateRentalCar(RentalCarDTO rentalCarDTO) {
        adminRentalCarMapper.updateRentalCar(rentalCarDTO);
    }

    // ✅ 렌트카 삭제
    public void deleteRentalCar(String rentalCarNo) {
        adminRentalCarMapper.deleteRentalCar(rentalCarNo);
    }

    public RentalCarDTO findByRentalCarNo(String rentalCarNo) {
        return adminRentalCarMapper.findRentalCarById(rentalCarNo);
    }

    public int insertImage(String base64Image) {
        if (base64Image != null && !base64Image.isEmpty()) {
            try {
                byte[] imageBytes = Base64.getDecoder().decode(base64Image); // 🔥 Base64 디코딩
                System.out.println("Base64 디코딩된 이미지 크기: " + imageBytes.length + " bytes");

                return adminRentalCarMapper.insertImage(imageBytes);
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
                System.out.println("Base64 디코딩 실패");
            }
        } else {
            return 0;
        }
        return 0;
    }

    public int insertRentalCar(String model, String type, String location, String fuel, String transmission,
            double pricePerDay, double hourlyPrice, int manufactureYear, String plateNumber, double insuranceFee,
            int status) {

        return adminRentalCarMapper.insertRentalCar(model, type, location, fuel, transmission, pricePerDay,
                hourlyPrice, manufactureYear, plateNumber, insuranceFee, status);
    }
}
