import Login from '../page/login';
import Logout from '../page/logout';
import SignUp from '../page/signUp';
import UsedCarBoard from '../page/usedCarBoard';
import ForgotId from '../page/forgotId';
import ForgotPw from '../page/forgotPw';
import KakaoCallback from '../components/kakaoCallback';
import AgentChat from '../components/AgentChat';
import PaymentPage from '../page/PaymentPage';
import Mypage from '../page/myPage';
import EditProfile from '../page/EditProfile';
import MypageAuth from '../page/myPageAuth';

import Shopping from '../page/shopping';
import ProductDetail from '../page/productDetail';
import ShoppingCart from '../page/shopping_cart';
import CarDetail from '../page/CarDetail';
import UpdateCar from '../page/UpdateCar';
import InquiryPage from '../page/InquiryPage';
import PostDetailPage from '../page/PostDetailPage';
import CustomerService from '../page/CustomerService';
import AdminDashboard from '../page/AdminDashboard';
import Home from '../page/home';
import AdminUsedCar from '../page/AdminUsedCar';
import AdminUsedCarAdd from '../page/AdminUsedCarAdd';
import DealerLocationList from '../page/DealerLocationList';
import CarsByLocation from '../page/CarsByLocation';
import CarPayment from '../page/CarPayment';
import CarPaymentdetaile from '../page/CarPaymentdetaile';
import AdminShoppingBoard from '../page/AdminShoppingBoard';
import AdminShoppingUpdate from '../page/AdminShoppingUpdate';
import AdminShoppingInsert from '../page/AdminShoppingInsert';
import PaymentSummary from '../page/ShoppingPaymentSummary';
import AgentChatList from '../components/AgentChatList';

import Rental from '../page/Rental';
import RentalCarDetail from '../page/RentalCarDetail';
import RentalPayment from '../page/RentalPayment';

import AdminRentalCarBoard from '../page/AdminRentalCarBoard';
import AdminRentalCarInsert from '../page/AdminRentalCarInsert';
import AdminRentalCarUpdate from '../page/AdminRentalCarUpdate';



const routes = [
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout /> },
    { path: '/signUp', element: <SignUp /> },
    { path: '/usedCarBoard', element: <UsedCarBoard /> },
    { path: '/forgotId', element: <ForgotId /> },
    { path: '/forgotPw', element: <ForgotPw /> },
    { path: '/auth/kakao/callback', element: <KakaoCallback /> },
    { path: '/paymentPage', element: <PaymentPage /> },
    { path: '/mypage', element: <Mypage /> },
    { path: '/mypage/editProfile', element: <EditProfile /> },
    { path: '/mypage/auth', element: <MypageAuth /> },
    { path: '/shopping/product/:productId', element: <ProductDetail /> },
    { path: '/shopping/cart', element: <ShoppingCart /> },
    { path: "/used-cars/detail/:vehicleNo", element: <CarDetail /> },
    { path: "/admin/used-car-update/:vehicleNo", element: <UpdateCar />, protected: true },
    { path: '/inquiry', element: <InquiryPage /> },
    { path: '/postDetail/:postId', element: <PostDetailPage /> },
    { path: '/customer-service', element: <CustomerService /> },
    { path: '/admin/dashboard', element: <AdminDashboard /> },
    { path: "/admin/used-car-board", element: <AdminUsedCar />, protected: true },
    { path: "/admin/used-car-add", element: <AdminUsedCarAdd />, protected: true },
    { path: '/dealerLocationList', element: <DealerLocationList /> },
    { path: "/cars/:location", element: <CarsByLocation /> },
    { path: "/carPayment", element: <CarPayment /> },
    { path: "/carPaymentdetaile", element: <CarPaymentdetaile /> },
    { path: '/', element: <Home /> },
    { path: '/shopping', element: <Shopping /> },
    { path: '/admin/shopping-board', element: <AdminShoppingBoard /> },
    { path: '/admin/shopping/update/:productId/:productColor', element: <AdminShoppingUpdate /> },
    { path: '/admin/shopping/add', element: <AdminShoppingInsert /> },
    { path: '/shopping/payment-summary', element: <PaymentSummary /> },
    { path: "/cars/:location", element: <CarsByLocation /> },
    { path: "/directdealerlocation", element: <DealerLocationList /> },
    { path: "/carsByLocation/:location", element: <CarsByLocation /> },
    { path: "/AgnetChatList", element: <AgentChatList /> },
    { path: "/agent-chat", element: <AgentChat /> },
    { path: '/rental', element: <Rental /> },
    { path: '/rental/list/:rentalCarNo', element: <RentalCarDetail /> },
    { path: '/rental/payment', element: <RentalPayment /> },
    { path: '/admin/rentalcarlist', element: <AdminRentalCarBoard /> },
    {path: '/admin/rental-cars/add', element: <AdminRentalCarInsert />},
    {path: '/admin/rental-cars', element: <AdminRentalCarBoard />},
    {path: '/admin/rental-cars/update/:rentalCarNo', element: <AdminRentalCarUpdate />},

];

export default routes;
