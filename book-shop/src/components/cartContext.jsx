
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// // Create a context for managing the cart state
// export const CartContext = createContext();

// // Create a provider component to wrap your entire application with
// export const CartProvider = ({ children }) => {
//     // const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

//     const [cart, setCart] = useState([]);
//     const [totalBuy, setTotalBuy] = useState(0);
//     const [user, setUser] = useState(null);
//     const [fetchCart, setFetchCart] = useState([]);
//     const [totalQuantity, setTotalQuantity] = useState(0);
//     const [totalAmount, setTotalAmount] = useState(0);

//     useEffect(() => {
//         const token = localStorage.getItem('jwtToken'); // Assuming token is stored in localStorage
//         if (token) {
//             try {
//                 const decodedToken = jwtDecode(token);
//                 setUser(decodedToken.sub); // Assuming 'sub' contains the user ID
//             } catch (error) {
//                 console.error('Failed to decode JWT token', error);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         // localStorage.setItem('cart', JSON.stringify(cart));
//         // localStorage.getItem('cart', JSON.stringify(cart));
//         // Calculate totalBuy
//         const total = cart.reduce((acc, item) => acc + parseInt(item.total), 0);
//         setTotalBuy(total);
//         // console.log(fetchCart);
//         // console.log(totalBuy);
//         // Send updated cart to backend
//         if (user) {
//             updateCartOnBackend(cart);
//         }
//     }, [cart, user]);

//     useEffect(() => {
//         if (user) {
//             fetchCartFromBackend();
//         }
//     }, [user]);

//     const fetchCartFromBackend = async () => {
//         try {
//             const token = localStorage.getItem('jwtToken');
//             const response = await axios.get('http://localhost:4000/cart', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 }
//             });
//             // const fetchedCart = response.data;
//             const { cart: fetchedCart, totalQuantity, totalAmount } = response.data;
//             // console.log({ cart: fetchedCart, totalQuantity, totalAmount });
//             // sessionStorage.setItem('cart', JSON.stringify(fetchCart.totalAmount));
//             setFetchCart(fetchedCart);
//             setTotalQuantity(totalQuantity);
//             setTotalAmount(totalAmount);
//         } catch (error) {
//             console.error('Failed to fetch cart from backend', error);
//         }
//     };

//     const updateCartOnBackend = async (cart) => {
//         try {
//             const token = localStorage.getItem('jwtToken'); // Assuming token is stored in localStorage
//             const payload = { cart, totalBuy };
//             console.log('Payload:', payload); // Log the payload
//             await axios.post('http://localhost:4000/cart/add', payload, totalBuy, {
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
//             // Product already exists in cart, increase quantity and update total amount
//             const updatedCart = [...cart];
//             updatedCart[foundIndex].quantity += 1;
//             updatedCart[foundIndex].totalAmount = updatedCart[foundIndex].price * updatedCart[foundIndex].quantity;
//             setCart(updatedCart);
//         } else {
//             // Product doesn't exist in cart, add as new item
//             const newCartItem = {
//                 user: user,
//                 id: product.id,
//                 nameProduct: product.nameProduct,
//                 price: product.price,
//                 quantity: 1,
//                 totalAmount: parseInt(product.price), // Initial totalAmount is just the price for 1 item
//             };
//             setCart([...cart, newCartItem]);
//         }
//     };

//     const removeFromCart = async (id) => {
//         const token = localStorage.getItem('jwtToken');
//         try {
//             await axios.delete(`http://localhost:4000/cart/remove/${id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 }
//             });
//             const updatedCart = cart.filter(item => item.id !== id);
//             setCart(updatedCart);
//             fetchCartFromBackend();
//         } catch (error) {
//             console.error('Failed to remove item from cart on backend', error);
//         }
//     };

//     const increaseQuantity = async (id) => {
//         try {
//             const token = localStorage.getItem('jwtToken');
//             const response = await axios.patch(`http://localhost:4000/cart/increaseQuantity/${id}`, {}, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 }
//             });
//             const updatedCart = cart.map(item => {
//                 if (item.id === id) {
//                     return { ...item, quantity: response.data.quantity, totalAmount: response.data.total };
//                 }
//                 return item;
//             });
//             setCart(updatedCart);
//             fetchCartFromBackend();
//         } catch (error) {
//             console.error('Failed to increase quantity', error);
//         }
//     };

//     const decreaseQuantity = async (id) => {
//         try {
//             const token = localStorage.getItem('jwtToken');
//             const response = await axios.patch(`http://localhost:4000/cart/decreaseQuantity/${id}`, {}, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 }
//             });
//             const updatedCart = cart.map(item => {
//                 if (item.id === id) {
//                     return { ...item, quantity: response.data.quantity, totalAmount: response.data.total };
//                 }
//                 return item;
//             });
//             setCart(updatedCart);
//             fetchCartFromBackend();
//         } catch (error) {
//             console.error('Failed to decrease quantity', error);
//         }
//     };

//     const clearCart = () => {
//         setCart([]);
//     };

//     // const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
//     // const cartItemsCount = Array.isArray(cart) ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

//     return (
//         <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, totalAmount, totalQuantity, totalBuy, fetchCart, fetchCartFromBackend }}>
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
    const [cart, setCart] = useState([]);
    const [totalBuy, setTotalBuy] = useState(0);
    const [user, setUser] = useState(null);
    const [fetchCart, setFetchCart] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

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
        if (user) {
            fetchCartFromBackend();
        }
    }, [user]);

    useEffect(() => {
        // Calculate totalBuy
        const total = cart.reduce((acc, item) => acc + parseInt(item.total), 0);
        setTotalBuy(total);

        // Send updated cart to backend
        if (user) {
            updateCartOnBackend(cart);
            // fetchCartFromBackend();
        }
    }, [cart, user]);

    const fetchCartFromBackend = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get('http://localhost:4000/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const { cart: fetchedCart, totalQuantity, totalAmount } = response.data;
            // console.log("IMPORT",fetchedCart);
            setFetchCart(fetchedCart);
            setTotalQuantity(totalQuantity);
            setTotalAmount(totalAmount);
            setCart(fetchedCart);
            setTotalBuy(totalAmount); // Assuming totalAmount is the same as totalBuy
        } catch (error) {
            console.error('Failed to fetch cart from backend', error);
        }
    };

    const updateCartOnBackend = async (cart) => {
        try {
            const token = localStorage.getItem('jwtToken'); // Assuming token is stored in localStorage
            const payload = { cart };
            console.log('Payload:', payload); // Log the payload
            await axios.post('http://localhost:4000/cart/add', payload, {
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

    const checkout = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            alert('You need to be logged in to checkout.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/cart/checkout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.invoice_url) {
                window.location.href = response.data.invoice_url; // Redirect to Xendit invoice page
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Checkout failed. Please try again.');
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, checkout, totalAmount, totalQuantity, totalBuy, fetchCart, fetchCartFromBackend }}>
            {children}
        </CartContext.Provider>
    );
};
