import {memo, useEffect, useState} from "react";
import "./style.scss";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {AiOutlineEye, AiOutlineShoppingCart} from "react-icons/ai";
import {formatter} from "../../../utils/formatter";

const HomePage = () =>{

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend API
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

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

    const  renderFeaturedProducts = (products) =>{
        return products.map((item, index) => (
           <>
                           <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                               <div className="featured_item">
                                   <div className="featured_item_pic" style={{ backgroundImage: `url(${item.imageUrl})` }}>
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
           </>
        ));
    }
    return  (
        <>
            {/*Categories Begin*/}
            <div className="container container_categories_slider">
                <Carousel responsive={responsive} className="categories_slider col-md-12 col-sm-12">
                    {
                        products.map((item,index)=>(
                            <div className="categories_slider_item" style={{ backgroundImage: `url(${item.imageUrl})` }} key={index}>
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
                        <Tabs>
                            <TabList >
                                <Tab>
                                    Trái cây
                                </Tab>
                            </TabList>
                            {renderFeaturedProducts(products)}
                            <TabPanel >
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
            {/*Featured End*/}
        </>
    );

};
export default memo(HomePage);