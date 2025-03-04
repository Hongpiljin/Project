package com.rental.service;

import com.rental.dto.UsedCarDTO;
import com.rental.dto.UsedCarImageDTO;
import com.rental.dto.UsedCarPaymentDTO;
import com.rental.dto.UsedCarpaymentDetailDTO;
import com.rental.mapper.MyPageMapper;
import com.rental.mapper.UsedCarImageMapper;
import com.rental.mapper.UsedCarMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service
public class UsedCarService {

    private final UsedCarMapper usedCarMapper;
    private final UsedCarImageMapper usedCarImageMapper;
    private final MyPageMapper mypageMapper;

    private static final String DEFAULT_IMAGE_URL = "/images/usedcar_imageX.png";

    public UsedCarService(UsedCarMapper usedCarMapper, UsedCarImageMapper usedCarImageMapper,
            MyPageMapper mypageMapper) {
        this.usedCarMapper = usedCarMapper;
        this.usedCarImageMapper = usedCarImageMapper;
        this.mypageMapper = mypageMapper;
    }

    // 전체 중고차 조회
    public List<UsedCarDTO> getAllUsedCars() {
        return usedCarMapper.getAllUsedCars();
    }

    // 차량 상세 조회 (이미지 포함)
    public UsedCarDTO getCarByVehicleNo(String vehicleNo) {
        UsedCarDTO car = usedCarMapper.findByVehicleNo(vehicleNo);
        if (car != null) {
            car.setUsedCarImages(usedCarImageMapper.getImagesByVehicleNo(vehicleNo));
        }
        return car;
    }

    // 차량 정보 수정 (이미지는 개별적으로 추가/삭제)
    @Transactional
    public void updateCarDetails(UsedCarDTO carDTO) {
        // 1. 차량 기본 정보 업데이트
        usedCarMapper.updateCarDetails(
                carDTO.getVehicleNo(),
                carDTO.getVehicleName(),
                carDTO.getBrand(),
                carDTO.getModelYear(),
                carDTO.getPrice(),
                carDTO.getColor(),
                carDTO.getFuelType(),
                carDTO.getTransmission(),
                carDTO.getDriveType(),
                carDTO.getSeatingCapacity(),
                carDTO.getCarKm(),
                carDTO.getMainImage(),
                carDTO.getDescription());
    
        // 2. 대표 이미지 업데이트
        if (carDTO.getMainImage() != null && carDTO.getMainImage().length > 0) {
            usedCarMapper.updateMainImage(carDTO.getVehicleNo(), carDTO.getMainImage());
        }
    
        // 3. 삭제할 이미지들 삭제
        if (carDTO.getDeletedImageIds() != null && !carDTO.getDeletedImageIds().isEmpty()) {
            deleteUsedCarImagesByIds(carDTO.getDeletedImageIds());
        }
    
        // 4. 새로 업로드한 이미지 파일만 INSERT (기존 서버 이미지는 제외)
        if (carDTO.getUsedCarImages() != null && !carDTO.getUsedCarImages().isEmpty()) {
            // 예: 각 UsedCarImageDTO 객체에 새 이미지 여부를 판별할 수 있는 플래그(isNew 등)가 있다면
            for (UsedCarImageDTO imageDTO : carDTO.getUsedCarImages()) {
                // 만약 imageDTO가 새로 업로드된 이미지라면 INSERT
                if (imageDTO.isNew()) { // 프론트엔드에서 새 이미지에 대해 true로 설정하거나,
                    usedCarImageMapper.insertUsedCarImage(imageDTO);
                }
            }
        }
    }

    public void deleteUsedCarImagesByIds(List<Long> deletedImageIds) {
        if (deletedImageIds != null && !deletedImageIds.isEmpty()) {
            for (Long imageId : deletedImageIds) {
                System.out.println("🛠️ 삭제 요청 이미지 ID: " + imageId);
                usedCarImageMapper.deleteImageById(imageId);
            }
        }
    }

    public void deleteUsedCarImages(List<String> deletedImages, String vehicleNo) {
        if (deletedImages != null && !deletedImages.isEmpty()) {
            for (String imageBase64 : deletedImages) {
                // 로그 출력 (삭제 요청된 Base64 문자열)
                System.out.println("🛠️ 삭제 요청 이미지 (Base64): " + imageBase64);

                // Base64 디코딩 후 byte[] 변환
                byte[] imageDataBytes = Base64.getDecoder().decode(imageBase64);

                // Mapper에 byte[] 전달
                usedCarImageMapper.deleteImageByData(imageDataBytes);
            }
        }
    }

    // 새로운 이미지 추가 (개별적으로 DB에 INSERT)
    public void addUsedCarImage(UsedCarImageDTO newImageDTO) {
        usedCarImageMapper.insertUsedCarImage(newImageDTO);
    }

    // 필터링된 중고차 목록 조회
    public List<UsedCarDTO> getFilteredUsedCars(
            String vehicleName, String vehicleType, String brand, Integer modelYear,
            Integer minPrice, Integer maxPrice, String color, String dealerLocation,
            String fuelType, String transmission, String driveType, Integer minKm,
            Integer maxKm, Integer seatingCapacity, String sortBy, String order,
            int offset, int itemsPerPage) {

        if (sortBy == null || (!sortBy.equals("car_km") && !sortBy.equals("price") && !sortBy.equals("model_year"))) {
            sortBy = "car_km";
        }

        if (!"asc".equalsIgnoreCase(order) && !"desc".equalsIgnoreCase(order)) {
            order = "asc";
        }

        return usedCarMapper.getFilteredUsedCars(
                vehicleName, vehicleType, brand, modelYear, minPrice, maxPrice, color, dealerLocation,
                fuelType, transmission, driveType, minKm, maxKm, seatingCapacity, sortBy, order, offset, itemsPerPage);
    }

    // 대표 이미지 상태 업데이트 (vehicleNo 기준)
    @Transactional
    public void updateMainImageStatus(String vehicleNo, String status) {
        usedCarImageMapper.updateMainImageStatusByVehicleNo(vehicleNo, "N");
        usedCarImageMapper.updateMainImageStatusByVehicleNo(vehicleNo, status);
    }

    // 대표 이미지 상태 업데이트 (imageId 기준)
    @Transactional
    public void updateMainImageStatusById(Long imageId, String status) {
        usedCarImageMapper.updateMainImageStatusById(imageId, status);
    }

    // 이미지 ID로 사용된 이미지 가져오기
    public UsedCarImageDTO getUsedCarImageById(Long mainImageId) {
        return usedCarImageMapper.getImageById(mainImageId);
    }

    @Transactional
    public void deleteUsedCar(String vehicleNo) {
        System.out.println(" 삭제 요청 vehicleNo: " + vehicleNo);
        try {
            // 1️⃣ 해당 차량의 모든 이미지 삭제
            usedCarImageMapper.deleteImagesByVehicleNo(vehicleNo);
            System.out.println(" 차량 이미지 삭제 완료");
    
            // 2️⃣ MAIN_IMAGE 컬럼 초기화
            usedCarMapper.clearMainImage(vehicleNo);
            System.out.println(" MAIN_IMAGE 필드 초기화 완료");
    
            // 3️⃣ 차량 데이터 삭제
            usedCarMapper.deleteUsedCar(vehicleNo);
            System.out.println(" 차량 삭제 완료");
    
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(" 차량 삭제 중 오류 발생: " + e.getMessage());
        }
    }

    // 차량 등록 (INSERT) API 구현
    @Transactional
    public void addCarDetails(UsedCarDTO usedCarDTO, List<UsedCarImageDTO> imageDTOList) {
        // 1. UsedCar 테이블에 차량 기본 정보 INSERT
        usedCarMapper.insertUsedCar(usedCarDTO);
        // usedCarDTO에 자동 생성된 vehicleNo가 주입되었다고 가정
        String vehicleNo = usedCarDTO.getVehicleNo();

        // 2. 대표 이미지가 지정되지 않은 경우, 이미지 목록이 있다면 첫 번째 이미지의 byte[]를 대표 이미지로 설정
        if (usedCarDTO.getMainImage() == null || usedCarDTO.getMainImage().length == 0) {
            if (imageDTOList != null && !imageDTOList.isEmpty()) {
                usedCarDTO.setMainImage(imageDTOList.get(0).getImageData());
            } else {
                usedCarDTO.setMainImage(DEFAULT_IMAGE_URL.getBytes());
            }
            // DB에 대표 이미지 업데이트 (mainImage는 byte[] 타입)
            usedCarMapper.updateMainImage(vehicleNo, usedCarDTO.getMainImage());
        }

        // 3. 각 이미지에 대해 차량 번호를 설정 후, USED_CAR_IMAGE 테이블에 INSERT
        if (imageDTOList != null && !imageDTOList.isEmpty()) {
            for (UsedCarImageDTO imageDTO : imageDTOList) {
                imageDTO.setVehicleNo(vehicleNo);
                usedCarImageMapper.insertUsedCarImage(imageDTO);
            }
        }
    }

    @Transactional
    public int processCarPayment(int userNo, UsedCarPaymentDTO paymentDTO) {
        // 1️⃣ 사용자 현재 포인트 조회
        int userPoint = mypageMapper.getUserPoint(userNo);
        System.out.println(" 현재 사용자 포인트: " + userPoint);

        // 결제 금액. (현재 paymentDTO.getPoint()를 결제 금액으로 사용)
        int paymentAmount = paymentDTO.getPoint();
        System.out.println(" 결제 금액: " + paymentAmount);

        if (userPoint < paymentAmount) {
            throw new IllegalStateException(" 보유 포인트가 부족합니다!");
        }

        // 2️⃣ 결제 내역 저장 - DB에서 PAYMENT_NO가 자동 생성됨
        paymentDTO.setUserNo(userNo);

        usedCarMapper.insertUsedCarPayment(paymentDTO);
        int paymentNo = paymentDTO.getPaymentNo(); // DB에서 생성된 결제번호가 설정됨
        System.out.println(" 생성된 paymentNo: " + paymentNo);

        // 3️⃣ 결제 상세 저장 (결제 금액도 함께 저장)
        UsedCarpaymentDetailDTO detailRecord = new UsedCarpaymentDetailDTO(

                paymentDTO.getVehicleNo(),
                paymentNo,
                new Timestamp(System.currentTimeMillis()),
                paymentAmount);
        detailRecord.setUserNo(userNo);
        System.out.println("detail DTO :" + detailRecord);
        usedCarMapper.insertUsedCarPaymentDetail(detailRecord);
        System.out.println(" 결제 상세 저장 완료");

        // 4️⃣ 사용자 포인트 차감
        int newPoint = userPoint - paymentAmount;
        mypageMapper.updateUserPoint(userNo, newPoint);
        System.out.println(" 차감 후 사용자 포인트: " + newPoint);

        return paymentNo;
    }

    @Transactional
    public void softDeleteUsedCar(String vehicleNo) {
        System.out.println(" 소프트 딜리트 요청 vehicleNo: " + vehicleNo);
        try {
            usedCarMapper.softDeleteUsedCar(vehicleNo);
            System.out.println(" 차량 게시물이 소프트 딜리트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(" 차량 소프트 딜리트 중 오류 발생: " + e.getMessage());
        }
    }

    @Transactional
    public void addUsedCarImages(List<UsedCarImageDTO> imageDTOList) {
        if (imageDTOList == null || imageDTOList.isEmpty()) {
            System.out.println(" 추가할 이미지 없음");
            return;
        }

        for (UsedCarImageDTO imageDTO : imageDTOList) {
            System.out.println(" 이미지 저장: " + imageDTO.getVehicleNo());
            usedCarImageMapper.insertUsedCarImage(imageDTO);
        }

        System.out.println(" 모든 이미지 저장 완료");
    }

    public int getFilteredUsedCarsCount(String vehicleName, String vehicleType, String brand, Integer modelYear,
            Integer minPrice, Integer maxPrice, String color, String dealerLocation, String fuelType,
            String transmission, String driveType, Integer minKm, Integer maxKm, Integer seatingCapacity) {

        // Mapper에 해당 조건에 맞는 차량 수를 조회하는 메서드를 호출합니다.
        return usedCarMapper.getFilteredUsedCarsCount(
                vehicleName, vehicleType, brand, modelYear, minPrice, maxPrice,
                color, dealerLocation, fuelType, transmission, driveType,
                minKm, maxKm, seatingCapacity);
    }
}