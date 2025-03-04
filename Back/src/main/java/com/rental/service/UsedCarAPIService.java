package com.rental.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.rental.dto.UsedCarDTO;
import com.rental.mapper.UsedCarAPIMapper;

@Service
public class UsedCarAPIService {

    private final UsedCarAPIMapper usedCarAPIMapper;

    public UsedCarAPIService(UsedCarAPIMapper usedCarAPIMapper) {
        this.usedCarAPIMapper = usedCarAPIMapper;
    }

    // ✅ 카카오 챗봇에서 지역별 차량 목록 조회
    public List<UsedCarDTO> getCarChatBot(String dealerLocation) {
        List<UsedCarDTO> cars = usedCarAPIMapper.findByDealerLocation(dealerLocation);
        System.out.println("차량 목록: " + cars);
        for (UsedCarDTO car : cars) {
            car.ensureBase64MainImage();
        }
        return cars;
    }



    // ✅ (추가) 차량번호로 차량 상세 조회
    public UsedCarDTO getCarByvehiclePlate(String vehiclePlate) {
        UsedCarDTO car = usedCarAPIMapper.findByVehiclePlate(vehiclePlate);
        System.out.println("차량 번호 정보: " + car);
        if (car != null) {
            car.ensureBase64MainImage();
        }
        return car;
    }
}
