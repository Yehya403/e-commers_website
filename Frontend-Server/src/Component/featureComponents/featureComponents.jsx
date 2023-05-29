import React, { useContext, useEffect, useState } from 'react';
import styles from './featureComponents.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";

export default function FeatureComponents() {
    let { createCart, setCartItem } = useContext(CartContext);
    const [allProducts, setAllProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    async function generateCart(productId) {
        let res = await createCart(productId);
        console.log(res, 'from fcomponent');
        console.log(res.data.status);
        if (res.data.status === "success") {
            toast.success(res.data.message, {
                position: 'bottom-right',
                className: 'box-shadow'
            });
            setCartItem(res.data.numOfCartItems);
        } else {
            toast.error(res.data.message, {
                position: 'bottom-right',
                className: 'box-shadow'
            });
        }
    }

    async function getProduct() {
        let data = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/products');
        setAllProducts(data.data.data);
    }

    useEffect(() => {
        getProduct();
    }, []);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>



            <div className="container-fluid "  id='' >
                <div className="container mt-5    pt-5 ">
                <div className="my-5">
                    <label htmlFor="search">Search:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="search"
                        name="search"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </div>
                <div className="row">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="col-md-2 box">
                            <div className="px-2 py-3">
                                <Link to={'/ProductDetails' + '/' + product.id}>
                                    <img className="w-100" src={product.imageCover} alt="" />
                                    <p className="p-color">{product.category.name}</p>
                                    <h3 className="h6">{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                                    <div className="d-flex justify-content-between">
                                        <h6>{product.price}EGP</h6>
                                        <div className="d-flex">
                                            <h6>{product.ratingsAverage}</h6>
                                            <i className="fa fa-star text-warning"></i>
                                        </div>
                                    </div>
                                </Link>
                                <div className="box-2 overflow-hidden text-center">
                                    <div className="sakr sakr-two text-center">
                                        <span onClick={() => generateCart(product.id)}>+ Add</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div></div>

        </>
    );
}
