package com.rental.mapper;

import com.rental.dto.UsedCarDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface UsedCarAPIMapper {

    // 지역별 차량 목록 조회
    List<UsedCarDTO> findByDealerLocation(@Param("dealerLocation") String dealerLocation);

    // 특정 차량 상세 조회 (숫자 ID 기반)
    UsedCarDTO findById(@Param("id") Long id);

    // 차량번호로 상세 조회 (새로 추가)
    UsedCarDTO findByVehiclePlate(@Param("vehiclePlate") String vehiclePlate);
}
