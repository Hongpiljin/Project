import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/UsedCarUpdate.css';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontSize from '@tiptap/extension-font-size';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UpdateCar = () => {
  const { vehicleNo } = useParams();
  const navigate = useNavigate();

  // 메인 formData (차량 정보)
  const [formData, setFormData] = useState({});
  // 새로 업로드된 파일들만 보관
  const [imageFiles, setImageFiles] = useState([]);
  // 미리보기 (서버+새파일)
  const [previewImages, setPreviewImages] = useState([]);
  // 대표 이미지
  const [selectedMainImage, setSelectedMainImage] = useState(null);
  // 삭제할 서버 이미지 ID 목록
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  
  // Tiptap 에디터
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false, // 중복 방지
        italic: false, // 중복 방지
        strike: false, // 중복 방지
        codeBlock: false, // 중복 방지
      }),
      Bold, 
      Italic, 
      Underline, 
      Strike, 
      CodeBlock, 
      Link.configure({ openOnClick: true }), 
      TextAlign.configure({ types: ['paragraph'] }),
      TextStyle, 
      FontSize, 
      Color, 
      Highlight.configure({ multicolor: true }), // 여러 색상 지원
      Image, 
      Table.configure({ resizable: true }), 
      TableRow, 
      TableCell, 
      TableHeader,
    ],
    content: `<div>
      <p>사고유무 : [  ]</p>
      <p>차량옵션 : [ ]</p>
      <p>차량특이사항 : [ ]</p>
      <p>판매자 번호 : [ ]</p>
      <p>판매자 이름 : [ ]</p>
      <p>전달하실 말씀 : [ ]</p>
      </div>`,
  });

  // 차량 상세정보 불러오기
  useEffect(() => {
    axios
    .get(`${SERVER_URL}/used-cars/detail?vehicleNo=${vehicleNo}`)
    .then((response) => {
        const carData = response.data;
        setFormData(carData);

        // 서버 이미지 -> 미리보기
        if (carData.usedCarImages) {
          const images = carData.usedCarImages.map((img) => ({
            file: null,
            url: img.imageData
              ? `data:image/png;base64,${img.imageData}`
              : `${SERVER_URL}${img.imageUrl}`,
            isServerImage: true,
            mainImage: img.mainImage === 'Y',
            imageId: img.imageId,
            vehicleNo: carData.vehicleNo,
          }));
          setPreviewImages(images);
          // 대표 이미지 설정
          const mainImg = images.find((img) => img.mainImage);
          if (mainImg) {
            setSelectedMainImage(mainImg.url);
          } else if (images.length > 0) {
            setSelectedMainImage(images[0].url);
          }
        }

        // 에디터 내용
        if (carData.description && editor) {
          editor.commands.setContent(carData.description);
        }
        
        setDeletedImageIds([]);
      })
      .catch((error) => console.error('Failed to fetch car details:', error));
    }, [vehicleNo, editor]);
    
    // 일반 인풋 핸들러
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [selectedFontColor, setSelectedFontColor] = useState("#000000"); // 기본 검은색
    const [selectedBgColor, setSelectedBgColor] = useState("#ffff00"); // 기본 노란색
    const handleFontColorChange = (e) => {
      const color = e.target.value;
      setSelectedFontColor(color);
      if (editor) {
        editor.chain().focus().setColor(color).run();
      }
    };

  // 🎨 배경 색상 변경 함수
  const handleBgColorChange = (e) => {
    const color = e.target.value;
    setSelectedBgColor(color);
    if (editor) {
      editor.chain().focus().setHighlight({ color }).run();
    }
  };
  // 새 이미지 업로드 시
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                file,
                url: reader.result,
                isServerImage: false,
                mainImage: false,
              });
            };
            reader.readAsDataURL(file);
          })
      )
    );

    setImageFiles((prev) => [...prev, ...newPreviews]);
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // 대표 이미지 선택
  const handleMainImageSelect = (imageObj) => {
    setSelectedMainImage(imageObj.url);
  };


  // X 버튼 눌러서 이미지 삭제
  const handleDeleteImage = (imageObj) => {
    // 미리보기 목록에서 제거
    setPreviewImages((prevImages) => {
      const updated = prevImages.filter((img) => img.url !== imageObj.url);
      // 대표 이미지였다면 다른 이미지로 교체
      if (selectedMainImage === imageObj.url && updated.length > 0) {
        setSelectedMainImage(updated[0].url);
      } else if (selectedMainImage === imageObj.url && updated.length === 0) {
        setSelectedMainImage(null);
      }
      return updated;
    });

    // 서버 이미지라면 deletedImageIds에 추가
    if (imageObj.isServerImage) {
      setDeletedImageIds((prevIds) => [...prevIds, imageObj.imageId]);
    } else {
      // 새로 업로드된 이미지라면 imageFiles에서도 제거
      setImageFiles((prevFiles) => prevFiles.filter((img) => img.url !== imageObj.url));
    }

    // formData.usedCarImages에서도 제거 (서버 이미지인 경우)
    setFormData((prev) => {
      if (!prev.usedCarImages) return prev;
      return {
        ...prev,
        usedCarImages: prev.usedCarImages.filter(
          (img) => img.imageId !== imageObj.imageId
        ),
      };
    });
  };

  // URL -> Base64
  const convertImageToBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return await blobToBase64(blob);
    } catch (error) {
      console.error('이미지 URL -> Base64 변환 오류:', error);
      return null;
    }
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  // 폼 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalVehicleNo = formData.vehicleNo?.trim() || vehicleNo;
    if (!finalVehicleNo) {
      alert('차대 번호를 입력해주세요.');
      return;
    }

    // 대표 이미지 Base64 변환
    let mainImageBase64 = selectedMainImage;
    if (mainImageBase64 && !mainImageBase64.startsWith('data:image')) {
      mainImageBase64 = await convertImageToBase64(mainImageBase64);
    }
    if (mainImageBase64 && mainImageBase64.startsWith('data:image')) {
      mainImageBase64 = mainImageBase64.split(',')[1];
    }

    // 새로 업로드한 이미지들만
    const newImages = imageFiles.filter((img) => !img.isServerImage);

    // payload
    const payload = {
      ...formData,
      vehicleNo: finalVehicleNo,
      mainImage: mainImageBase64,
      description: editor?.getHTML() || '',
      deletedImageIds: deletedImageIds,
    };

    // JSON -> Blob
    const carDataBlob = new Blob([JSON.stringify(payload)], {
      type: 'application/json',
    });

    // FormData 생성
    const updatedFormData = new FormData();
    updatedFormData.append('carData', carDataBlob);
    newImages.forEach((fileObj) => updatedFormData.append('images', fileObj.file));

    try {
      await axios.post(`${SERVER_URL}/used-cars/update-car-details`, updatedFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('차량 수정이 완료되었습니다.');
      navigate('/admin/cars');
    } catch (error) {
      console.error('Failed to update car details:', error.response?.data || error.message);
      alert(`수정 실패: ${error.response?.data || error.message}`);
    }
  };

  if (!formData.vehicleNo) return <p>로딩 중...</p>;

  return (
    <form className="edit-car-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>차량 정보 수정</h1>

      {/* 차량 이름 */}
      <label>
        차량 이름:
        <input
          type="text"
          name="vehicleName"
          value={formData.vehicleName || ''}
          onChange={handleChange}
        />
      </label>

      {/* 브랜드 */}
      <label>
        브랜드:
        <select name="brand" value={formData.brand || ''} onChange={handleChange}>
          <option value="">브랜드 선택</option>
          <option value="현대">현대</option>
          <option value="기아">기아</option>
          <option value="제네시스">제네시스</option>
          <option value="쉐보레(GM대우)">쉐보레(GM대우)</option>
          <option value="르노코리아(삼성)">르노코리아(삼성)</option>
        </select>
      </label>

      {/* 연식 */}
      <label>
        연식:
        <input
          type="number"
          name="modelYear"
          value={formData.modelYear || ''}
          onChange={handleChange}
        />
      </label>

      {/* 가격 */}
      <label>
        가격:
        <input
          type="number"
          name="price"
          value={formData.price || ''}
          onChange={handleChange}
        />
      </label>

      {/* 색상 */}
      <label>
        색상:
        <select name="color" value={formData.color || ''} onChange={handleChange}>
          <option value="">색상 선택</option>
          <option value="white">화이트</option>
          <option value="black">블랙</option>
          <option value="silver">실버</option>
          <option value="gray">그레이</option>
          <option value="red">레드</option>
          <option value="blue">블루</option>
          <option value="yellow">노랑</option>
        </select>
      </label>

      {/* 변속기 */}
      <label>
        변속기:
        <select name="transmission" value={formData.transmission || ''} onChange={handleChange}>
          <option value="">변속기 선택</option>
          <option value="새마오토">새마오토</option>
          <option value="수동">수동</option>
          <option value="CVT">CVT</option>
        </select>
      </label>

      {/* 차대번호 */}
      <label>
        차대번호:
        <input
          type="text"
          name="vehicleNo"
          value={formData.vehicleNo || ''}
          onChange={handleChange}
        />
      </label>

      {/* 구동방식 */}
      <label>구동방식:</label>
      <select name="driveType" value={formData.driveType || ''} onChange={handleChange}>
        <option value="">구동방식 선택</option>
        <option value="FWD">FWD</option>
        <option value="AWD">AWD</option>
        <option value="RWD">RWD</option>
      </select>

      {/* 인승 */}
      <label>인승 인원:</label>
      <select name="seatingCapacity" value={formData.seatingCapacity || ''} onChange={handleChange}>
        <option value="">인원 선택</option>
        {[4, 5, 6, 7, 8, 9, 10].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      {/* 연료 */}
      <label>연료:</label>
      <select name="fuelType" value={formData.fuelType || ''} onChange={handleChange}>
        <option value="">연료 선택</option>
        <option value="경유">경유</option>
        <option value="디젤">디젤</option>
        <option value="휘발유">휘발유</option>
        <option value="LPG">LPG</option>
        <option value="CNG">CNG</option>
      </select>

      {/* 차종 */}
      <label>
        차종:
        <select name="vehicleType" value={formData.vehicleType || ''} onChange={handleChange}>
          <option value="">차종 선택</option>
          <option value="대형차">대형차</option>
          <option value="중형차">중형차</option>
          <option value="준중형차">준중형차</option>
          <option value="경차">경차</option>
          <option value="SUV">SUV</option>
        </select>
      </label>

      {/* 판매점 */}
      <label>
        판매점:
        <select name="dealerLocation" value={formData.dealerLocation || ''} onChange={handleChange}>
          <option value="">판매점 지역선택</option>
          <option value="서울">서울</option>
          <option value="경기">경기</option>
          <option value="인천">인천</option>
          <option value="대구">대구</option>
          <option value="울산">울산</option>
          <option value="부산">부산</option>
        </select>
      </label>

      {/* 차량 번호판 */}
      <label>
        차량 번호(번호판):
        <input
          type="text"
          name="vehiclePlate"
          value={formData.vehiclePlate || ''}
          onChange={handleChange}
        />
      </label>

      {/* 에디터(차량 설명) */}
      <label>차량 설명:</label>
      <h4>*취소시 전 작업, 다시 실행시 앞 작업으로 돌아갑니다*</h4>
      <div className="tiptap-editor">
        {editor && <EditorContent editor={editor} />}
      </div>
      <div className="tiptap-toolbar">
        {/* 에디터 툴바 버튼들 */}
        <button type="button" onClick={() => editor.chain().focus().undo().run()}>
          ↩ 취소
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()}>
          ↪ 다시 실행
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>굵게</b>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>기울임</i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>밑줄</u>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}>
          취소선
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          왼쪽 정렬
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          가운데 정렬
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          오른쪽 정렬
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          ● 리스트
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. 리스트
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          ❝ 인용문
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          — 구분선
        </button>
        <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 2, cols: 2 }).run()}>
          📊 테이블 추가
        </button>
        <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()}>
          ➕ 행 추가
        </button>
        <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()}>
          ➕ 열 추가
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          코드 블록
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt('URL 입력:');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          🔗 링크 추가
        </button>
        <select onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}>
          <option value="12px">12px</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="28px">28px</option>
        </select>
        <label> 폰트 색상:</label>
        <input
          type="color"
          value={selectedFontColor}
          onChange={handleFontColorChange}
          style={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "3px",
            backgroundColor: selectedFontColor,
          }}
          title="폰트 색상 변경"
        />
      
      <label> 배경 색상:</label>
<input
  type="color"
  value={selectedBgColor}
  onChange={handleBgColorChange}
  style={{
    border: "2px solid #ccc",
    borderRadius: "5px",
    padding: "3px",
    backgroundColor: selectedBgColor,
  }}
  title="배경 색상 변경"
/>
      </div>

      {/* 대표 이미지 + 미리보기 */}
      <label>대표 이미지:</label>
      <div className="preview-container">
  {previewImages.map((imageObj, index) => (
    <div key={index} className="image-preview">
      <img
        src={imageObj.url}
        alt="차량 이미지"
        className={selectedMainImage === imageObj.url ? 'selected' : ''}
        onClick={(e) => {
          e.preventDefault();
          handleMainImageSelect(imageObj);
        }}
        onError={(e) => (e.target.src = '/default-image.png')}
      />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteImage(imageObj);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 새 이미지 업로드 */}
      <label>
        새 이미지 업로드:
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </label>

      {/* 제출 버튼 */}
      <button type="submit">수정 완료</button>
    </form>
  );
};

export default UpdateCar;
