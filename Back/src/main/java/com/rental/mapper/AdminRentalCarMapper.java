package com.rental.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.rental.dto.RentalCarDTO;

@Mapper
public interface AdminRentalCarMapper {


//렌터카 전체 조회
List<RentalCarDTO> findAllRentalCars();
//렌터카 상세 조회
RentalCarDTO findRentalCarById(String rentalCarNo);


//어드민에서만 사용
// ✅ 렌트카 등록
int addRentalCar(RentalCarDTO rentalCarDTO);

// ✅ 렌트카 정보 수정
void updateRentalCar(RentalCarDTO rentalCarDTO);

// ✅ 렌트카 삭제
void deleteRentalCar(String rentalCarNo);

//렌트카 추가 시 가장 큰 번호 조회
String getLatestCarNo();
int insertImage(byte[] imageBytes);
int insertRentalCar(String model, String type, String location, String fuel, String transmission, double pricePerDay,
        double hourlyPrice, int manufactureYear, String plateNumber, double insuranceFee, int status);
}

