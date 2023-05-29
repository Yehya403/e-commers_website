import axios from "axios";
import { useEffect, useState } from "react";

const { createContext } = require("react");


// https://route-ecommerce-app.vercel.app/



export let CartContext = createContext(0)



export default function CartContextProvider(props) {


    const [numOfCartItems, setCartItem] = useState(0)
    const [cartID, setCartID] = useState(null)



    useEffect(() => {
        getInitialValue()
    }, [])



    // async function getuserDetails(id) {
    //     let res = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/users/${id}`)
    //     console.log(res);
    // }







    async function getInitialValue() {
        let { data } = await getAllCart();
        console.log(data, 'from 7anaka');
        console.log(data.data._id, data.numOfCartItems, 'sakoor');
        if (data.status == 'success') {
            setCartItem(data.numOfCartItems)
            setCartID(data.data._id)
        }
    }






    function getAllCart() {
        return axios.get('https://route-ecommerce-app.vercel.app/api/v1/cart',
            {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }).then(res => res)
            .catch(err => err)

    }


    function createCart(productId) {
        console.log(productId);

        return axios.post('https://route-ecommerce-app.vercel.app/api/v1/cart', { productId: productId },
            {
                headers: {
                    token: localStorage.getItem('userToken')
                }

            }).then(res => res)
            .catch(err => err)
    }





    function updateCart(id, count) {

        return axios.put(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`, { count },
            {
                headers: {
                    token: localStorage.getItem('userToken')
                }

            }).then(res => res)
            .catch(err => err)
    }




    function removeCartData(id) {

        return axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`,
            {
                headers: {
                    token: localStorage.getItem('userToken')
                }

            }).then(res => res)
            .catch(err => err)
    }


    function clearCart(id) {

        return axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart`,
            {
                headers: {
                    token: localStorage.getItem('userToken')
                }

            }).then(res => res)
            .catch(err => err)
    }

    function generateOnlinePayment(cart, shippingAddress) {
        return axios.post(`https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/${cart}?url=http://localhost:3000`,
            { shippingAddress: shippingAddress },
            {
                headers: {
                    token: localStorage.getItem('userToken')
                }

            }).then(res => res)
            .catch(err => err)
    }












    const [cart, setCart] = useState([])
    return <CartContext.Provider value={{  setCartItem, numOfCartItems, cartID, cart, createCart, getAllCart, updateCart, removeCartData, clearCart, generateOnlinePayment }} >
        {props.children}
    </CartContext.Provider>

}