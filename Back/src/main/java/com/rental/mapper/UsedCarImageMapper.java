package com.rental.mapper;

import com.rental.dto.UsedCarImageDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UsedCarImageMapper {
    
    List<UsedCarImageDTO> getImagesByVehicleNo(@Param("vehicleNo") String vehicleNo);
    
    void insertUsedCarImage(UsedCarImageDTO newImageDTO);
    
    void deleteImageByData(@Param("imageData") byte[] imageData);


    void updateMainImageStatusByVehicleNo(String vehicleNo, String status);
    
    void updateMainImageStatusById(Long imageId, String status);
    
    UsedCarImageDTO getImageById(Long mainImageId);

    //  차량 번호 기반 이미지 삭제 기능

    void deleteImagesByVehicleNo(@Param("vehicleNo") String vehicleNo);

    void deleteImageById(Long imageId);
    
    


}
