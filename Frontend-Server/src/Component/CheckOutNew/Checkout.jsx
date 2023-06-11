import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/about');
  }

  return (
    <>
      <div className="profile w-50 py-4 my-4 m-auto text-center">
        <h2>Cart summary</h2>
        <p>You have selected {cartItems} products</p>
        <p>Total Price: {totalPrice} EGP</p>
        <button className='btn btn-primary' onClick={handleCheckout}>Checkout</button>
      </div>
    </>
  );
}
