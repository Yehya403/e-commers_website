import React, { useContext, useEffect, useState } from 'react';
// import styel from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';





export default function ProductDetails() {

    let { createCart } = useContext(CartContext)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let { id } = useParams();
    console.log(id);

    const [supCategores, setSupCategores] = useState([]);



    async function generateCart(productId) {
        let res = await createCart(productId)
        console.log(res, 'from fcomponent');
        console.log(res.data.status);
        if (res.data.status == "success") {
            toast.success(res.data.message ,
                {
                    position:'bottom-right',
                    className:'box-shadow  '
                })
        }else{
            toast.error(res.data.message ,
                {
                    position:'bottom-right',
                    className:'box-shadow  '
                })
        }
    }

    async function supCategoru() {
        let response = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`);
        let data = response.data.data;
        setSupCategores(data);
        console.log(supCategores);
    }

    useEffect(() => {
        supCategoru();
    }, []);

    return (
        <>



            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {supCategores.images && supCategores.images.map((img) => (
                                <div key={img}>
                                    <img className='w-100' src={img} alt="" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="col-md-8">
                        <h1>{supCategores.title}</h1>
                        <p>{supCategores.description}</p>
                        <div className="d-flex justify-content-between mt-2">
                            <p>{supCategores.price}EGP</p>
                            <div className="d-flex">
                                <h6>{supCategores.ratingsAverage}</h6>
                                <i className='fa fa-star text-warning '></i>
                            </div>
                        </div>
                        <button onClick={() => generateCart(id)} className='btn btn-success w-100 text-white mt-2'>+ Add</button>
                    </div>
                </div>
            </div>
        </>
    );
}
