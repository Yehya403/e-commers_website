import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';

export default function ProductDetails() {

    const { createCart, cartItems, setCartItems } = useContext(CartContext);

    const [product, setProduct] = useState({});
    const [totalPrice, setTotalPrice] = useState(0); //Modified


    let { id } = useParams();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    async function getProduct() {
        try {
            const response = await axios.get(`http://localhost:7000/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProduct();
    }, [id]);
//     useEffect(() => {
//     setTotalPrice(totalPrice + product.price);
// }, [product]);


    const handleAddToCart = async () => {
        try {
            await createCart(product._id);
            toast.success(`${product.title} added to cart!`, {
                position: "bottom-right",
                className: "box-shadow",
            });
            setCartItems(cartItems + 1);
            setTotalPrice(totalPrice + product.price); //MModified
        } catch (error) {
            toast.error("Failed to add product to cart", {
                position: "bottom-right",
                className: "box-shadow",
            });
        }
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{product.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <img className="w-100" src={product.imageUrl} alt="" />
                    </div>
                    <div className="col-md-8">
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <div className="d-flex justify-content-between mt-2">
              <p>{product.price}EGP</p>
              <div className="d-flex">
                <h6 className='d-flex mb-3'>{product.ratingAverage}</h6>
                <i className="fa fa-star text-warning d-flex"></i>
                <div>
                <h3>Total: {totalPrice} EGP</h3>
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                </div>
              </div>
            </div>
           
                    </div>
                  
                </div>
            </div>
            <div className="container mt-5">
                <p>You have selected {cartItems} products</p>
                <p>Total Price: {totalPrice} EGP</p>
            </div>
        </>
    );
}




