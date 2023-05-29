import React, { useContext, useEffect, useState } from 'react';
import './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { Offline, Online } from "react-detect-offline";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';






export default function Cart() {


    const [cartDetails, setCartDetails] = useState({})

    let { getAllCart, updateCart, removeCartData, clearCart } = useContext(CartContext)


    useEffect(() => {
        getDetailscart()
    }, [])


    async function getDetailscart() {
        let res = await getAllCart()
        console.log(res);

        setCartDetails(res.data)
        console.log(cartDetails.data.totalCartPrice);
    }


    async function removeItem(id) {
        let res = await removeCartData(id)
        console.log(res);
        localStorage.setItem("userID" , id )

        setCartDetails(res.data)
    }



    async function updateDetailscart(id, count) {
        let res = await updateCart(id, count)
        localStorage.setItem("userID" , id )
        console.log(res);
        setCartDetails(res.data)
        if (count >= 0) {

        }





    }


    async function clearAllCart() {
        let res = await clearCart()
        setCartDetails()


    }






    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>

            <Offline> <span className='networkStatus' >Only shown offline (surprise!)</span> </Offline>
            {cartDetails && cartDetails.data && <div className=" cartbg container py-5 my-5 px-5 ">
                <h3>Cart Details</h3>
                <h4>Total price: {cartDetails?.data?.totalCartPrice} </h4>
                {cartDetails.data.products.map((product) => <div key={product._id} className='row border-bottom border-bottom-dark  p-2' >
                    <div className="col-md-2 my-2 ">
                        <img className='w-100' src={product.product.imageCover} alt="" />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between ">
                        <div className="">    <h4>{product.product.title}</h4>
                            <p className=' h3  mt-1 ' > Price: {product.price}</p>
                            <button onClick={() => removeItem(product.product._id)} className=' btn btn-outline-danger ' ><i className=' px-1   fa fa-trash' >
                            </i>Remove</button>
                        </div>

                        <div className="d-flex align-items-center ">
                            <button className='btn btn-primary mx-2 ' onClick={() => updateDetailscart(product.product._id, product.count + 1)}  >+</button>
                            <p className='h3' >{product.count}</p>
                            <button className='btn btn-danger mx-2 ' onClick={() => updateDetailscart(product.product._id, product.count - 1)}  >-</button>


                        </div>
                    </div>

                </div>)}
                <div className=" d-flex align-items-center mt-5 ">
                    <button onClick={() => clearAllCart()} className='btn btn-danger  w-25  mx-3 ' >Clear all</button>
                    <Link to ={'/CheckOut'} className=' w-75 h-100 btn btn-outline-primary ' >Proceed to payment</Link>
                </div>

            </div>}


        </>
    );
}
