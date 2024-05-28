import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./style.scss"

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setSearchResults(response.data);
            } catch (error) {
                console.error('There was an error fetching the products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const product = searchResults.find(product =>
            product.name.toLowerCase() === searchTerm.toLowerCase()
        );
        if (product) {
            navigate(`/chi-tiet-san-pham/${product.productId}`);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const filteredResults = searchResults.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="hero_seach_form">
            <input
                id="searchInput"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Bạn đang tìm gì?"
            />
            <button type="button" onClick={handleSearch}>Tìm kiếm</button>
            {searchTerm && (
                <ul className="showItems">
                    {filteredResults.map((product) => (
                        <li className="list-items" key={product.productId} >
                            <Link style={{ textDecoration: 'none' }} to={`/chi-tiet-san-pham/${product.productId}`}>
                                {product.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
