// // import { createContext, useEffect, useState } from "react";

// // const CartContext = createContext({
// //     cartItems: [],
// //     setCartItems: () => { },
// //     addToCart: () => { },
// //     cartItemsCount: 0,
// //     totalBuy: 0,
// // });
// // // console.log(CartContext);
// // // eslint-disable-next-line react/prop-types
// // export const CartProvider = ({ children }) => {
// //     const [cartItems, setCartItems] = useState([]);

// //     const addToCart = (product) => {
// //         setCartItems([...cartItems, product]);
// //         sessionStorage.setItem('cartItem', JSON.stringify(cartItems))

// //     };

// //     const calculateTotalBuy = () => {
// //         const total = cartItems.reduce((accumulator, product) => accumulator + parseInt(product.price), null)
// //         sessionStorage.setItem('totalBuy', JSON.stringify(total))
// //         // return total
// //     }

// //     const [totalBuy, setTotalBuy] = useState(calculateTotalBuy())

// //     useEffect(() => {
// //         const storedItems = sessionStorage.getItem('cartItems')
// //         const storedTotal = sessionStorage.getItem('totalBuy')
// //         if (storedItems) {
// //             setCartItems(JSON.parse(storedItems))
// //         }
// //         if (storedTotal) {
// //             setTotalBuy(JSON.parse(storedTotal))
// //         }


// //     }, [cartItems])

// //     const cartItemsCount = cartItems.length;
// //     // console.log(cartItemsCount);
// //     // console.log(cartItems);
// //     const value = { cartItems, setCartItems, addToCart, cartItemsCount, totalBuy };
// //     return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// // };

// // export default CartContext;


// import React, { createContext, useState, useEffect } from 'react';

// // Create a context for managing the cart state
// export const CartContext = createContext();

// // Create a provider component to wrap your entire application with
// export const CartProvider = ({ children }) => {
//     const initialCart = JSON.parse(sessionStorage.getItem('cart')) || [];

//     const [cart, setCart] = useState(initialCart);

//     useEffect(() => {
//         sessionStorage.setItem('cart', JSON.stringify(cart));
//     }, [cart]);

//     const addToCart = (product) => {
//         const foundIndex = cart.findIndex(item => item.id === product.id);

//         if (foundIndex !== -1) {
//             // product already exists in cart, increase quantity
//             const updatedCart = [...cart];
//             updatedCart[foundIndex].quantity += 1;
//             setCart(updatedCart);
//         } else {
//             // product doesn't exist in cart, add as new item
//             const newCartItem = {
//                 id: product.id,
//                 nameProduct: product.nameProduct,
//                 price: product.price,
//                 quantity: 1,
//                 totalAmount: product.price * quantity,
//             };
//             setCart([...cart, newCartItem]);
//         }
//     };

//     const removeFromCart = (productId) => {
//         const updatedCart = cart.filter(item => item.id !== productId);
//         setCart(updatedCart);
//     };

//     const clearCart = () => {
//         setCart([]);
//     };

//     return (
//         <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };


// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// // Create a context for managing the cart state
// export const CartContext = createContext();

// // Create a provider component to wrap your entire application with
// export const CartProvider = ({ children }) => {
//     const initialCart = JSON.parse(sessionStorage.getItem('cart')) || [];

//     const [cart, setCart] = useState(initialCart);
//     const [totalBuy, setTotalBuy] = useState(0);

//     useEffect(() => {
//         sessionStorage.setItem('cart', JSON.stringify(cart));
//         const totalBuy = cart.reduce((acc, item) => acc + item.totalAmount, 0);
//         setTotalBuy(totalBuy)
//         // Send updated cart to backend
//         updateCartOnBackend(cart, totalBuy);
//     }, [cart]);

//     const updateCartOnBackend = async (cart) => {
//         try {
//             const token = localStorage.getItem('jwtToken'); // Assuming token is stored in localStorage
//             await axios.post('http://localhost:4000/add', cart, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });
//         } catch (error) {
//             console.error('Failed to update cart on backend', error);
//         }
//     };
//     const addToCart = (product) => {
//         const foundIndex = cart.findIndex(item => item.id === product.id);

//         if (foundIndex !== -1) {
//             // product already exists in cart, increase quantity and update total amount
//             const updatedCart = [...cart];
//             updatedCart[foundIndex].quantity += 1;
//             updatedCart[foundIndex].totalAmount = updatedCart[foundIndex].price * updatedCart[foundIndex].quantity;
//             setCart(updatedCart);
//         } else {
//             // product doesn't exist in cart, add as new item
//             const newCartItem = {
//                 id: product.id,
//                 nameProduct: product.nameProduct,
//                 price: product.price,
//                 quantity: 1,
//                 totalAmount: product.price, // Initial totalAmount is just the price for 1 item
//             };
//             setCart([...cart, newCartItem]);
//         }
//     };

//     const removeFromCart = (productId) => {
//         const updatedCart = cart.filter(item => item.id !== productId);
//         setCart(updatedCart);
//     };
//     const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

//     const clearCart = () => {
//         setCart([]);
//     };


//     return (
//         <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartItemsCount, totalBuy }}>
//             {children}
//         </CartContext.Provider>
//     );
// };


import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create a context for managing the cart state
export const CartContext = createContext();

// Create a provider component to wrap your entire application with
export const CartProvider = ({ children }) => {
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

    const [cart, setCart] = useState(initialCart);
    const [totalBuy, setTotalBuy] = useState(0);
    const [user, setUser] = useState(null);
    const [fetchCart, setFetchCart] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken'); // Assuming token is stored in localStorage
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken.sub); // Assuming 'sub' contains the user ID
            } catch (error) {
                console.error('Failed to decode JWT token', error);
            }
        }
    }, []);

    useEffect(() => {
        // localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.getItem('cart', JSON.stringify(fetchCart));
        // Calculate totalBuy
        const total = fetchCart.reduce((acc, item) => acc + parseInt(item.total), 0);
        setTotalBuy(total);
        // console.log(fetchCart);
        console.log(totalBuy);
        // fetchCartFromBackend();
        // Send updated cart to backend
        if (user) {
            updateCartOnBackend(cart, total);
        }
    }, [cart, user]);

    useEffect(() => {
        if (user) {
            fetchCartFromBackend();
        }
    }, [user]);

    const fetchCartFromBackend = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get('http://localhost:4000/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const fetchedCart = response.data;
            // console.log('Fetched Cart from backend:', fetchedCart);
            localStorage.setItem('cart', JSON.stringify(fetchedCart))
            setFetchCart(fetchedCart);
        } catch (error) {
            console.error('Failed to fetch cart from backend', error);
        }
    };

    const updateCartOnBackend = async (cart, totalBuy) => {
        try {
            const token = localStorage.getItem('jwtToken'); // Assuming token is stored in localStorage
            await axios.post('http://localhost:4000/cart/add', { cart, totalBuy }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            console.error('Failed to update cart on backend', error);
        }
    };

    const addToCart = (product) => {
        const foundIndex = cart.findIndex(item => item.id === product.id);

        if (foundIndex !== -1) {
            // Product already exists in cart, increase quantity and update total amount
            const updatedCart = [...cart];
            updatedCart[foundIndex].quantity += 1;
            updatedCart[foundIndex].totalAmount = updatedCart[foundIndex].price * updatedCart[foundIndex].quantity;
            setCart(updatedCart);
        } else {
            // Product doesn't exist in cart, add as new item
            const newCartItem = {
                user: user,
                id: product.id,
                nameProduct: product.nameProduct,
                price: product.price,
                quantity: 1,
                totalAmount: parseInt(product.price), // Initial totalAmount is just the price for 1 item
            };
            setCart([...cart, newCartItem]);
        }
    };

    const removeFromCart = async (id) => {
        const token = localStorage.getItem('jwtToken');
        try {
            await axios.delete(`http://localhost:4000/cart/remove/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const updatedCart = cart.filter(item => item.id !== id);
            setCart(updatedCart);
            fetchCartFromBackend();
        } catch (error) {
            console.error('Failed to remove item from cart on backend', error);
        }
    };

    const increaseQuantity = async (id) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.patch(`http://localhost:4000/cart/increaseQuantity/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const updatedCart = cart.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: response.data.quantity, totalAmount: response.data.total };
                }
                return item;
            });
            setCart(updatedCart);
            fetchCartFromBackend();
        } catch (error) {
            console.error('Failed to increase quantity', error);
        }
    };

    const decreaseQuantity = async (id) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.patch(`http://localhost:4000/cart/decreaseQuantity/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const updatedCart = cart.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: response.data.quantity, totalAmount: response.data.total };
                }
                return item;
            });
            setCart(updatedCart);
            fetchCartFromBackend();
        } catch (error) {
            console.error('Failed to decrease quantity', error);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, cartItemsCount, totalBuy, fetchCart, fetchCartFromBackend }}>
            {children}
        </CartContext.Provider>
    );
};
