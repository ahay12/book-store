import React, { useContext, useState } from 'react';
import { CartContext } from './cartContext';
import axios from 'axios';
import FormatRupiah from './toRupiah';

export default function Checkout() {
    const { cart, totalBuy, removeFromCart } = useContext(CartContext);
    const [message, setMessage] = useState('');

    // const handleCheckout = async () => {
    //     const token = localStorage.getItem('jwtToken');

    //     if (!token) {
    //         setMessage('You need to be logged in to checkout.');
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(
    //             'http://localhost:4000/add', // Replace with your backend URL
    //             { cart },
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             }
    //         );

    //         if (response.status === 200) {
    //             setMessage('Checkout successful!');
    //             // Clear cart if needed
    //         }
    //     } catch (error) {
    //         console.error('Error during checkout:', error);
    //         setMessage('Checkout failed. Please try again.');
    //     }
    // };

    return (
        <div>
            <div className='container bg-primary rounded-lg shadow-lg w-[140vh] mt-5'>
                <h1>Your Cart</h1>
                {cart.map(item => (
                    <div className='p-5' key={item.product_id}>
                        <ul>
                            <li>
                                {item.nameProduct}
                            </li>
                            <li>
                                Qty: {item.quantity}
                            </li>
                            <li>
                                Price:{FormatRupiah(item.totalAmount)}
                            </li>
                            <button className='btn btn-error' onClick={() => removeFromCart(item.id)}>Remove</button>
                        </ul>
                        <hr className='bg-gray-500 my-5' />
                    </div>
                ))}
                <span>Total Paid: {FormatRupiah(totalBuy)}</span>
                <hr />
                <button className='my-5 btn btn-secondary' >Checkout</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}
