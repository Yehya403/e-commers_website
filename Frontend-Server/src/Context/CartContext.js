import React, { createContext, useState } from 'react';
const CartContext = createContext();

function CartContextProvider(props) {

    const [cart, setCart] = useState([]);

    const [cartItems, setCartItems] = useState(0);

    async function createCart(id) {
        try {
            const response = await fetch(`http://localhost:6000/carts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: id }),
            });

            const data = await response.json();

            setCart([...cart, data]);

        } catch (error) {
            console.log(error);
        }
    }

    async function getCart() {
        try {
            const response = await fetch('http://localhost:6000/carts');
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCartItem(id) {
        try {
            await fetch(`http://localhost:6000/carts/${id}`, {
                method: 'DELETE',
            });

            const newCart = cart.filter((item) => item._id !== id);
            setCart(newCart);

            setCartItems(cartItems - 1);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CartContext.Provider value={{ cart, createCart, getCart, deleteCartItem, cartItems, setCartItems }}>
            {props.children}
        </CartContext.Provider>
    );
}

export { CartContext, CartContextProvider as default };