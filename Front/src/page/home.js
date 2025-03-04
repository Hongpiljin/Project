import Map from './map';
import "../css/Home.css";

export default function Home() {
    return (
        <div>
            <section class="main-banner">
                <div class="banner-content">
                    <h1>새로운 중고차를 찾고 있나요?</h1>
                    <p>렌터카와 중고차, 다양한 모델을 만나보세요!</p>
                    <a href="#shop-now" class="btn">지금 쇼핑하기</a>
                </div>
            </section>

            <section class="car-categories">
                <h2>차량 카테고리</h2>
                <div class="category-list">
                    <div class="category-card">세단</div>
                    <div class="category-card">SUV</div>
                    <div class="category-card">스포츠카</div>
                    <div class="category-card">전기차</div>
                </div>
            </section>

            <section class="featured-cars">
                <h2>추천 차량</h2>
                <div class="car-list">
                    <div class="car-card">
                        <h3>아반떼</h3>
                        <p>10000원</p>
                        <a href="#">상세보기</a>
                    </div>
                    <div class="car-card">
                        <h3>소나타</h3>
                        <p>12000원</p>
                        <a href="#">상세보기</a>
                    </div>
                </div>
            </section>

            <section class="car-rentals">
                <h2>렌터카 서비스</h2>
                <div class="rental-card">
                    <h3>렌터카 예약하기</h3>
                    <p>렌터카 모델을 선택하고 원하는 일정을 예약하세요.</p>
                    <a href="#">예약하기</a>
                </div>
            </section>

            <section class="promotions">
                <h2>프로모션</h2>
                <div class="promo-banner">
                    <p>한정 할인, 지금 바로 예약하고 혜택을 누리세요!</p>
                </div>
            </section>
            <Map />
        </div>
    );

}