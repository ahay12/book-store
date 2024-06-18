import { createContext, useEffect, useState } from "react";

const CartContext = createContext({
    cartItems: [],
    setCartItems: () => { },
    addToCart: () => { },
    cartItemsCount: 0,
    totalBuy: 0,
});
// console.log(CartContext);
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
        sessionStorage.setItem('cartItem', JSON.stringify(cartItems))

    };

    const calculateTotalBuy = () => {
        const total = cartItems.reduce((accumulator, product) => accumulator + parseInt(product.price), null)
        sessionStorage.setItem('totalBuy', JSON.stringify(total))
        // return total
    }

    const [totalBuy, setTotalBuy] = useState(calculateTotalBuy())

    useEffect(() => {
        const storedItems = sessionStorage.getItem('cartItems')
        const storedTotal = sessionStorage.getItem('totalBuy')
        if (storedItems) {
            setCartItems(JSON.parse(storedItems))
        }
        if (storedTotal) {
            setTotalBuy(JSON.parse(storedTotal))
        }


    }, [cartItems])

    const cartItemsCount = cartItems.length;
    // console.log(cartItemsCount);
    // console.log(cartItems);
    const value = { cartItems, setCartItems, addToCart, cartItemsCount, totalBuy };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
