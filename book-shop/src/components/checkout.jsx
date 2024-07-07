// import React, { useContext, useState, useEffect } from 'react';
// import { CartContext } from './cartContext';
// import FormatRupiah from './toRupiah';

// export default function Checkout() {
//     const { fetchCart, totalBuy, removeFromCart, fetchCartFromBackend } = useContext(CartContext);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         fetchCartFromBackend();
//     }, []);

//     //     const token = localStorage.getItem('jwtToken');

//     //     if (!token) {
//     //         setMessage('You need to be logged in to checkout.');
//     //         return;
//     //     }

//     //     try {
//     //         const response = await axios.post(
//     //             'http://localhost:4000/add', // Replace with your backend URL
//     //             { cart },
//     //             {
//     //                 headers: {
//     //                     'Authorization': `Bearer ${token}`,
//     //                     'Content-Type': 'application/json'
//     //                 }
//     //             }
//     //         );

//     //         if (response.status === 200) {
//     //             setMessage('Checkout successful!');
//     //             // Clear cart if needed
//     //         }
//     //     } catch (error) {
//     //         console.error('Error during checkout:', error);
//     //         setMessage('Checkout failed. Please try again.');
//     //     }
//     // };

//     return (
//         <div>
//             <div className='container bg-primary rounded-lg shadow-lg w-[140vh] mt-5'>
//                 <h1>Your Cart</h1>
//                 {fetchCart?.map(item => (
//                     <div className='p-5' key={item.product_id}>
//                         <ul>
//                             <li>
//                                 {item.nameProduct}
//                             </li>
//                             <li>
//                                 Qty: {item.quantity}
//                             </li>
//                             <li>
//                                 Price:{FormatRupiah(item.totalAmount)}
//                             </li>
//                             <button className='btn btn-error' onClick={() => removeFromCart(item.id)}>Remove</button>
//                         </ul>
//                         <hr className='bg-gray-500 my-5' />
//                     </div>
//                 ))}
//                 <span>Total Paid: {FormatRupiah(totalBuy)}</span>
//                 <hr />
//                 <button className='my-5 btn btn-secondary' >Checkout</button>
//                 {message && <p>{message}</p>}
//             </div>
//         </div>
//     );
// }

// import React, { useContext, useState, useEffect } from 'react';
// import { CartContext } from './cartContext';
// import FormatRupiah from './toRupiah';

// export default function Checkout() {
//     const { fetchCart, totalBuy, removeFromCart, fetchCartFromBackend } = useContext(CartContext);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         fetchCartFromBackend();
//     }, []);
//     useEffect(() => {
//         console.log('Fetch Cart:', fetchCart);
//     }, [fetchCart]);

//     return (
//         <div>
//             <div className='container bg-primary rounded-lg shadow-lg w-[140vh] mt-5'>
//                 <h1>Your Cart</h1>
//                 {fetchCart?.length > 0 ? (
//                     fetchCart.map(item => (
//                         <div className='p-5' key={item.id}>
//                             <ul>
//                                 <li>{item.nameProduct}</li>
//                                 <li>Qty: {item.quantity}</li>
//                                 <li>Price: {FormatRupiah(item.price)}</li>
//                                 <button className='btn btn-error' onClick={() => removeFromCart(item.id)}>Remove</button>
//                             </ul>
//                             <hr className='bg-gray-500 my-5' />
//                         </div>
//                     ))
//                 ) : (
//                     <p>Your cart is empty</p>
//                 )}
//                 <span>Total Paid: {FormatRupiah(totalBuy)}</span>
//                 <hr />
//                 <button className='my-5 btn btn-secondary'>Checkout</button>
//                 {message && <p>{message}</p>}
//             </div>
//         </div>
//     );
// }


import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './cartContext';
import FormatRupiah from './toRupiah';

export default function Checkout() {
    const { fetchCart, removeFromCart, fetchCartFromBackend, totalAmount, increaseQuantity, decreaseQuantity, checkout } = useContext(CartContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCartFromBackend();
    }, []);

    useEffect(() => {
        console.log('Fetch Cart:', fetchCart);
    }, [fetchCart]);

    return (
        <div>
            <div className='container bg-primary rounded-lg shadow-lg w-[140vh] mt-5'>
                <h1>Your Cart</h1>
                {fetchCart.length > 0 ? (
                    fetchCart.map(item => (
                        <div className='grid gap-2' key={item.id}>
                            <ul>
                                <li>{item.nameProduct}</li>
                                <li>Qty: {item.quantity}</li>
                                <li>Price: {FormatRupiah(item.price)}</li>
                                <div className='grid grid-flow-col gap-5'>
                                    <button className='btn btn-error' onClick={() => removeFromCart(item.id)}>Remove</button>
                                    <button className='btn btn-secondary' onClick={() => increaseQuantity(item.product_id)}>+</button>
                                    <button className='btn btn-secondary' onClick={() => decreaseQuantity(item.product_id)}>-</button>
                                </div>
                            </ul>
                            <hr className='bg-gray-500 my-5' />
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty</p>
                )}
                <span className='font-bold'>Total Paid: {FormatRupiah(totalAmount)}</span>
                <hr />
                <button onClick={checkout} className='my-5 btn btn-secondary'>Checkout</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}
