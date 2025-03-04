package com.rental.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rental.dto.RentalCarDTO;
import com.rental.service.AdminRentalCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/rental-cars")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // React 연동 시 CORS 해결
public class AdminRentalCarController {

    private final AdminRentalCarService adminRentalCarService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // ✅ 특정 렌트카 정보 가져오기 (수정 시 기존 데이터 로드)
    @GetMapping("/{rentalCarNo}")
    public ResponseEntity<RentalCarDTO> getRentalCar(@PathVariable String rentalCarNo) {
        RentalCarDTO rentalCar = adminRentalCarService.findByRentalCarNo(rentalCarNo);
        if (rentalCar != null) {
            return ResponseEntity.ok(rentalCar);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // ✅ 렌트카 목록 조회
    @GetMapping("/list")
    public ResponseEntity<List<RentalCarDTO>> getAllRentalCars() {
        List<RentalCarDTO> rentalCars = adminRentalCarService.getAllRentalCars();
        return ResponseEntity.ok(rentalCars);
    }

    // ✅ 렌트카 등록 (JSON 데이터 받기)
    @PostMapping("/add")
    public ResponseEntity<?> addRentalCar(
            @RequestParam("model") String model,
            @RequestParam("type") String type,
            @RequestParam("location") String location,
            @RequestParam("fuel") String fuel,
            @RequestParam("transmission") String transmission,
            @RequestParam("pricePerDay") double pricePerDay,
            @RequestParam("hourlyPrice") double hourlyPrice,
            @RequestParam("manufactureYear") int manufactureYear,
            @RequestParam("plateNumber") String plateNumber,
            @RequestParam("insuranceFee") double insuranceFee,
            @RequestParam("status") int status,
            @RequestParam("carImage") MultipartFile[] carImages) {

        // 이미지 파일을 처리
        System.out.println("carImages.length : " + carImages.length);

        System.out.println("받아온 데이터들 ");

        System.out.println(model);
        System.out.println(type);
        System.out.println(location);
        System.out.println(fuel);
        System.out.println(transmission);
        System.out.println(pricePerDay);
        System.out.println(hourlyPrice);
        System.out.println(manufactureYear);
        System.out.println(plateNumber);
        System.out.println(insuranceFee);
        System.out.println(status);

        int count = adminRentalCarService.insertRentalCar(model, type, location, fuel, transmission, pricePerDay, hourlyPrice, manufactureYear, plateNumber, insuranceFee, status);


        try {
            if (carImages != null) {
                // 파일을 Base64로 인코딩
                for (MultipartFile carImage : carImages) {
                    // 이미지 파일의 바이트 배열 얻기
                    byte[] imageBytes = carImage.getBytes();
                    
                    // Base64로 변환
                    String base64Image = Base64.getEncoder().encodeToString(imageBytes);

                    count = adminRentalCarService.insertImage(base64Image);
                    
                    // Base64 문자열 출력 (디버깅용)
                    System.out.println("이미지 크기: " + imageBytes.length);  // 이미지의 크기 출력
                    System.out.println("Base64 인코딩 이미지: " + base64Image);  // Base64로 변환된 이미지 출력
                }
            } else {
                System.out.println("프로필 이미지 없음");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("파일 처리 중 오류 발생: " + e.getMessage());
        }

        return null;
    }

    // ✅ 렌트카 정보 수정
    @PutMapping("/update")
    public ResponseEntity<String> updateRentalCar(@RequestBody RentalCarDTO rentalCarDTO) {
        adminRentalCarService.updateRentalCar(rentalCarDTO);
        return ResponseEntity.ok("🚗 렌트카 정보가 수정되었습니다.");
    }

    // ✅ 렌트카 삭제
    @DeleteMapping("/{rentalCarNo}")
    public ResponseEntity<String> deleteRentalCar(@PathVariable String rentalCarNo) {
        adminRentalCarService.deleteRentalCar(rentalCarNo);
        return ResponseEntity.ok("🚗 렌트카가 삭제되었습니다.");
    }
}
