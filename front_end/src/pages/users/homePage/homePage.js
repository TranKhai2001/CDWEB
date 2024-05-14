import {memo} from "react";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import "./style.scss"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Item1 from "assets/users/image/trai_cay/dau_tay.jpg";
import Item2 from "assets/users/image/trai_cay/buoi.jpg";
import Item3 from "assets/users/image/trai_cay/dua_luoi.jpg";
import Item4 from "assets/users/image/trai_cay/man_do.jpg";
import Item5 from "assets/users/image/trai_cay/mang_cau_gai.jpg";
import Item6 from "assets/users/image/trai_cay/sau_rieng.jpg";
import Item7 from "assets/users/image/trai_cay/thanh_long.jpg";


import F1 from "assets/users/image/rau_cu/bap_cai_tim.webp";
import F2 from "assets/users/image/rau_cu/bi_do.webp";
import F3 from "assets/users/image/rau_cu/bong-cai-xanh-baby.webp";
import F4 from "assets/users/image/rau_cu/ca-chua.webp";
import F5 from "assets/users/image/rau_cu/cai-thao.webp";
import F6 from "assets/users/image/rau_cu/mong-toi.webp";
import F7 from "assets/users/image/rau_cu/rau-den.webp";
import F8 from "assets/users/image/rau_cu/rau-lang.webp";
import {AiOutlineEye, AiOutlineShoppingCart} from "react-icons/ai";
import {formatter} from "../../../utils/formatter";

const HomePage = () =>{

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const sliderItems = [
        {
            bgImg: Item1,
            name:"Dâu tây"
        },
        {
            bgImg: Item2,
            name:"Bưởi"
        },
        {
            bgImg: Item3,
            name:"Dưa lưới"
        },
        {
            bgImg: Item4,
            name:"Mận đỏ"
        },{
            bgImg: Item5,
            name:"Mẵng cầu gai"
        }
    ]
    const featProduct = {
        all:{
            title:"Toàn bộ",
            products:[
                {
                    img: Item1,
                    name:"Dâu tây",
                    price: 10000
                },
                {
                    img: Item2,
                    name:"Bưởi",
                    price: 10000
                },
                {
                    img: Item3,
                    name:"Dưa lưới",
                    price: 10000
                },
                {
                    img: Item4,
                    name:"Mận đỏ",
                    price: 10000
                },
                {
                    img: Item5,
                    name:"Mẵng cầu gai",
                    price: 10000
                },
                {
                    img: Item6,
                    name:"Sầu riêng",
                    price: 10000
                },
                {
                    img: Item7,
                    name:"Thanh long",
                    price: 10000
                },
                {
                    img:F1,
                    name:"Bắp cải tím",
                    price:10000
                },
                {
                    img:F2,
                    name:"Bí đỏ",
                    price:10000
                },
                {
                    img:F3,
                    name:"Bông cải xanh baby",
                    price:10000
                },
                {
                    img:F4,
                    name:"Cà chua",
                    price:10000
                },
                {
                    img:F5,
                    name:"Cải thảo",
                    price:10000
                },
                {
                    img:F6,
                    name:"Mồng tời",
                    price:10000
                },
                {
                    img:F7,
                    name:"Rau dền",
                    price:10000
                },
                {
                    img:F8,
                    name:"Rau lang",
                    price:10000
                }
            ]
        },
        fruit:{
            title: "Trái cây",
            products: [
                {
                    img: Item1,
                    name:"Dâu tây",
                    price: 10000
                },
                {
                    img: Item2,
                    name:"Bưởi",
                    price: 10000
                },
                {
                    img: Item3,
                    name:"Dưa lưới",
                    price: 10000
                },
                {
                    img: Item4,
                    name:"Mận đỏ",
                    price: 10000
                },
                {
                    img: Item5,
                    name:"Mẵng cầu gai",
                    price: 10000
                },
                {
                    img: Item6,
                    name:"Sầu riêng",
                    price: 10000
                },
                {
                    img: Item7,
                    name:"Thanh long",
                    price: 10000
                }
            ]
        },
        vegetable:{
            title:"Rau củ",
            products:[{
                img:F1,
                name:"Bắp cải tím",
                price:10000
            },
                {
                    img:F2,
                    name:"Bí đỏ",
                    price:10000
                },
                {
                    img:F3,
                    name:"Bông cải xanh baby",
                    price:10000
                },
                {
                    img:F4,
                    name:"Cà chua",
                    price:10000
                },
                {
                    img:F5,
                    name:"Cải thảo",
                    price:10000
                },
                {
                    img:F6,
                    name:"Mồng tời",
                    price:10000
                },
                {
                    img:F7,
                    name:"Rau dền",
                    price:10000
                },
                {
                    img:F8,
                    name:"Rau lang",
                    price:10000
                }]
        }
    }
    const  renderFeaturedProducts = (data) =>{
        const tabList=[];
        const tabPanels = [];

        Object.keys(data).forEach((key,index) => {
            tabList.push(<Tab key={index}>{data[key].title}</Tab>);
            const tabPanel = [];
            data[key].products.forEach((item,j) => {
                tabPanel.push(
                    <div className="col-lg-3 col-md-6 col-sm-6" key={j}>
                        <div className="featured_item">
                            <div className="featured_item_pic" style={{backgroundImage:`url(${item.img})`}}>
                                <ul className="featured_item_pic_hover">
                                    <li>
                                        <AiOutlineEye />
                                    </li>
                                    <li>
                                        <AiOutlineShoppingCart />
                                    </li>
                                </ul>
                            </div>
                            <div className="featured_item_text">
                                <h6><a href="">{item.name}</a></h6>
                                <h5>{formatter(item.price)}</h5>
                            </div>
                        </div>
                    </div>
                );
            });
            tabPanels.push(tabPanel);
        });

        return (
           <>
               <Tabs>
                   <TabList>{tabList}</TabList>
                   {tabPanels.map((item,key)=>(
                       <TabPanel key={key}>
                           <div className="row">{item}</div>
                       </TabPanel>
                   ))}
               </Tabs>
           </>
        );
    }
    return (
        <>
            {/*Categories Begin*/}
            <div className="container container_categories_slider">
                <Carousel responsive={responsive} className="categories_slider col-md-12 col-sm-12">
                    {
                        sliderItems.map((item,key)=>(
                            <div className="categories_slider_item" style={{backgroundImage: `url(${item.bgImg})`}} key={key}>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </Carousel>;
            </div>
            {/*Categories End*/}
            {/*Featured Begin*/}
            <div className="container">
                <div className="featured">
                    <div className="section-title">
                        <h2>Sản phẩm nổi bật</h2>
                        {renderFeaturedProducts(featProduct)}
                    </div>
                </div>
            </div>
            {/*Featured End*/}
        </>
    );

};
export default memo(HomePage);