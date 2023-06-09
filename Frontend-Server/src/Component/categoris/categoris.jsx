import React, { useEffect, useState } from 'react'
import styel from './categoris.module.css'
import Slider from "react-slick";
import axios from 'axios';
import {Helmet} from "react-helmet";



export default function Categoris() {
    var settings = {
        dots: true,
        infinite: true,
        
        button:false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2
    };

    const [categores, setCategores] = useState([]);

    async function Categores() {
        let data = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/categories')
        console.log(data.data.data);
        setCategores(data.data.data)
    }

    useEffect(() => {
        Categores()
    }, [])
    return (
        <>
            <Slider className='widthoo'  {...settings}>
                {categores.map((category) => <div className='bg-dark text-white' key={category} >

                    <img  height={300}  className='w-100'  src={category.image} alt="" />
                    <h4 className='h6 ' > {category.name} </h4>
                </div>
                )}
            </Slider></>
    )
}
