import { ROUTERS } from "./utils/router";
import HomePage from "./pages/users/homePage/homePage";
import { Route, Routes } from "react-router-dom";
import MasterLayout from "./pages/users/theme/masterLayout/masterLayout";
import ProfilePage from "./pages/users/profilePage/profilePage";
import LoginPage from "./pages/users/loginPage/loginPage";
import RegisterPage from "./pages/users/registerPage/registerPage";
import DetailProduct from "./pages/users/detailProduct/detailProduct";
import Cart from "./pages/users/cart/cart";
import Pay from "./pages/users/pay/pay";
import OderConfirrm from "./pages/users/oderConfirm/oderConfirrm";
import OrderHistory from "./pages/users/orderHistory/OrderHistory";
import OrderHistoryDetail from "./pages/users/orderHistoryDetail/orderHistoryDetail";
import AdminPage from "./pages/adminPage/admin";
import ListUser from "./pages/adminPage/listUser/listUser";
import ListProduct from "./pages/adminPage/listProduct/listProduct";
import ListOrder from "./pages/adminPage/listOrder/listOrder";
import UserDetails from "./pages/adminPage/userDetails/userDetails";
import ChangePassword from "./pages/users/changePassword/changePassword";
import ProductDetailAdmin from "./pages/adminPage/productDetailAdmin/productDetailAdmin";

function renderUserRouter() {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage />,
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <LoginPage />,
        },
        {
            path: ROUTERS.USER.REGISTER,
            component: <RegisterPage />,
        },
        {
            path: ROUTERS.USER.CHANGEPASSWORD,
            component: <ChangePassword />,
        },
        {
            path: ROUTERS.USER.DETAILPRODUCT,
            component: <DetailProduct />,
        },
        {
            path: ROUTERS.USER.CART,
            component: <Cart />,
        },
        {
            path: ROUTERS.USER.PAY,
            component: <Pay />,
        },
        {
            path: ROUTERS.USER.ORDERCONFIRM,
            component: <OderConfirrm />,
        },
        {
            path: ROUTERS.USER.ORDERHISTORY,
            component: <OrderHistory />,
        },
        {
            path: ROUTERS.USER.ORDERHISTORYDETAIL,
            component: <OrderHistoryDetail />,
        },
        {
            path: ROUTERS.USER.ADMINPAGE,
            component: <AdminPage />,
        }
        ,
        {
            path: ROUTERS.USER.LISTUSER,
            component: <ListUser />,
        },
        {
            path: ROUTERS.USER.LISTPRODUCT,
            component: <ListProduct />,
        },
        {
            path: ROUTERS.USER.LISTODER,
            component: <ListOrder />,
        }
        ,
        {
            path: ROUTERS.USER.USERDETAILS,
            component: <UserDetails />,
        },
        {
            path: ROUTERS.USER.PRODUCTDETAILADMIN,
            component: <ProductDetailAdmin />,
        }
    ];
    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) =>
                    (<Route key={key} path={item.path} element={item.component} />)
                )}
            </Routes>
        </MasterLayout>
    );
}

const RouterCustom = () => {
    return renderUserRouter();
}

export default RouterCustom;