import ProductDetailAdmin from "../pages/adminPage/productDetailAdmin/productDetailAdmin";
import CategoryList from "../pages/adminPage/categoryList/categoryList";

export const ROUTERS = {
    USER : {
        HOME : "",
        PROFILE: "Thong-tin-ca-nhan",
        LOGIN: "dang-nhap",
        REGISTER: "dang-ky",
        CHANGEPASSWORD: "doi-mat-khau",
        PRODUCT: "San-pham",
        DETAILPRODUCT: "chi-tiet-san-pham/:productId",
        CART: "gio-hang",
        PAY: "thanh-toan",
        ORDERCONFIRM:"xac-nhan-don-hang",
        ORDERHISTORY:"lich-su-don-hang",
        ORDERHISTORYDETAIL: "chi-tiet-don-hang/:orderId",
        ORDERDETAILADMIN: "chi-tiet-don-hang-admin/:orderId",
        ADMINPAGE :"admin",
        LISTUSER : "danh-sach-nguoi-dung",
        LISTPRODUCT: "danh-sach-san-pham",
        LISTODER: "danh-sach-don-hang",
        USERDETAILS : "chi-tiet-nguoi-dung/:userId",
        PRODUCTDETAILADMIN:"chi-tiet-san-pham-admin/:productId",
        CATEGORYLIST:"danh-sach-danh-muc",
        CATEGORYDETAIL:"chi-tiet-danh-muc/:categoryId",
        ADDCATEGORY:"them-danh-muc"
    }
}