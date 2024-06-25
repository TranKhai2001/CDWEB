import { memo, useEffect, useState } from "react";
import "./style.scss";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { formatter } from "../../../utils/formatter";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 20;

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from the backend API
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });

        // Fetch categories from the backend API
        axios.get('http://localhost:8080/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }, []);

    const handleAddToCart = (productId) => {
        const cartItem = {
            productId: productId,
            quantity: 1,
            price: products.find(product => product.productId === productId).price
        };

        axios.post('http://localhost:8080/api/cart/add', cartItem, { withCredentials: true })
            .then(response => {
                // Add active class to button
                const button = document.querySelector(`li[data-id="${productId}"]`);
                button.classList.add('active');
                // Remove active class after 0.5s
                setTimeout(() => {
                    button.classList.remove('active');
                }, 500);
            })
            .catch(error => {
                console.error("There was an error adding the product to the cart!", error);
                alert("Vui lòng đăng nhập để có thể mua sắm");
            });
    };

    const responsive = {
        superLargeDesktop: {
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

    const renderFeaturedProducts = (products) => {
        return products.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                <div className="featured_item">
                    <div className="featured_item_pic" style={{ backgroundImage: `url(${item.imageUrl})` }} >
                        <ul className="featured_item_pic_hover">
                            <li onClick={() => navigate(`/chi-tiet-san-pham/${item.productId}`)}>
                                <AiOutlineEye />
                            </li>
                            <li onClick={() => handleAddToCart(item.productId)} data-id={item.productId}>
                                <AiOutlineShoppingCart />
                            </li>
                        </ul>
                    </div>
                    <div className="featured_item_text">
                        <h6><a href="#">{item.name}</a></h6>
                        <h5>{formatter(item.price)}</h5>
                    </div>
                </div>
            </div>
        ));
    };

    // Filter products by selected category
    const getFilteredProducts = () => {
        if (selectedCategory === 'Tất cả') {
            return products;
        } else {
            return products.filter(product => product.categoryName === selectedCategory);
        }
    };

    const handlePageClick = (newPage) => {
        setCurrentPage(newPage);
    };

    const filteredProducts = getFilteredProducts();
    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
    const displayedProducts = filteredProducts.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

    return (
        <>
            {/* Categories Begin */}
            <div className="container container_categories_slider">
                <Carousel responsive={responsive} className="categories_slider col-md-12 col-sm-12">
                    {
                        products
                            .slice()
                            .sort((a, b) => b.sold - a.sold)
                            .slice(0, 6)
                            .map((item, index) => (
                                <div className="categories_slider_item" style={{ backgroundImage: `url(${item.imageUrl})` }} key={index}>
                                    <p onClick={() => navigate(`/chi-tiet-san-pham/${item.productId}`)}>{item.name}</p>
                                </div>
                            ))
                    }
                </Carousel>
            </div>
            {/* Categories End */}
            {/* Featured Begin */}
            <div className="container">
                <div className="featured">
                    <div className="section-title">
                        <h2>Sản phẩm nổi bật</h2>
                        <Tabs>
                            <TabList>
                                <Tab onClick={() => setSelectedCategory('Tất cả')}>Tất cả</Tab>
                                {categories.map((category, index) => (
                                    <Tab key={index} onClick={() => setSelectedCategory(category.name)}>
                                        {category.name}
                                    </Tab>
                                ))}
                            </TabList>
                            <TabPanel>
                                <div className="row">
                                    {renderFeaturedProducts(displayedProducts)}
                                </div>
                            </TabPanel>
                            {categories.map((category, index) => (
                                <TabPanel key={index}>
                                    <div className="row">
                                        {renderFeaturedProducts(displayedProducts)}
                                    </div>
                                </TabPanel>
                            ))}
                        </Tabs>
                    </div>

                    <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
                </div>
            </div>
            {/* Featured End */}
        </>
    );
};

const Pagination = ({ pageCount, onPageChange, currentPage }) => (
    <div className="pagination">
        {[...Array(pageCount)].map((_, index) => (
            <button
                key={index}
                className={`page-number ${index === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(index)}
            >
                {index + 1}
            </button>
        ))}
    </div>
);

export default memo(HomePage);