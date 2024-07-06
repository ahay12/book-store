// import axios from "axios"
// import { useContext, useEffect, useState } from "react"
// import FormatRupiah from "./toRupiah"
// import Countdown from "./countdown"
// import CartContext from "./cart"

// export default function SpecialOffers() {
//     const [products, setProducts] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const { addToCart } = useContext(CartContext)

//     const getProducts = async () => {
//         const response = await axios.get('http://localhost:4000/product');
//         // console.log('response', response.data.product);
//         const discountedProducts = response.data.product.filter(product => product.discount > 0);
//         setProducts(discountedProducts)
//         setIsLoading(false)


//     };

//     useEffect(() => {
//         getProducts()
//     }, [])

//     const targetDate = new Date('2024-07-15');

//     return (
//         <>
//             <div className="container pb-10">
//                 <div className="flex justify-center pb-16">
//                     <div className="flex flex-col">
//                         <h1 id="specialOffers" className="text-4xl text-center font-bold">Special Offers</h1>
//                         <p className="">Save Now! Limited-Time Offers on Your Favorite Products!</p>
//                     </div>
//                 </div>
//                 <div className="flex justify-center pb-10">
//                     <Countdown targetDate={targetDate} />
//                 </div>
//                 <div className="container">
//                     <div className="flex flex-row justify-center">
//                         {isLoading ? (
//                             <>
//                                 {Array(3).fill().map((_, index) =>
//                                     <div key={index + 1} className="card w-96 h-96 bg-primary shadow-xl mx-10 text-white">
//                                         <div className="skeleton card-body">
//                                         </div>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <>
//                                 {products.slice(0, 3).map((product) =>
//                                     <div key={product.id} className="card w-80 bg-primary shadow-xl mx-10 text-white">
//                                         <figure><img className="w-[384px] h-[230px]" src={`${product.image || 'http://localhost:4000/images/no_image.jpg'}`} alt={product.nameProduct} /></figure>
//                                         <div className="card-body">
//                                             <div className="badge badge-secondary">NEW</div>
//                                             <h2 className="card-title truncate">{product.nameProduct}</h2>
//                                             <p className="truncate">{product.descProduct}</p>
//                                             <div className="card-actions justify-end">
//                                                 <div className="badge badge-secondary select-none">Genre</div>
//                                                 <div className="badge badge-secondary select-none">Genre</div>
//                                             </div>
//                                             <p className="font-bold text-md line-through opacity-80 text-red-500">{(`${FormatRupiah(parseInt(product.price) + parseInt(product.discount))}`)}</p>
//                                             <p className="font-bold text-xl text-black">{FormatRupiah(product.price)}</p>
//                                             <button onClick={() => addToCart(product)} className="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
//                                             </svg>
//                                                 Add to cart</button>
//                                         </div>
//                                     </div>
//                                 )
//                                 }
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div >
//         </>
//     )
// }
// import axios from "axios"
// import { useContext, useEffect, useState } from "react"
// import FormatRupiah from "./toRupiah"
// import Countdown from "./countdown"
// export default function SpecialOffers() {
//     const [products, setProducts] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const [cartItems, setCartItems] = useState([])

//     const getProducts = async () => {
//         const response = await axios.get('http://localhost:4000/product');
//         // console.log('response', response.data.product);
//         const discountedProducts = response.data.product.filter(product => product.discount > 0);
//         setProducts(discountedProducts)
//         setIsLoading(false)


//     };

//     const addToCart = async (product) => {
//         // Check if item already exists in cart
//         const existingItem = cartItems.find((item) => item.id === product.id);

//         if (existingItem) {
//             // Update quantity if item already exists
//             setCartItems(
//                 cartItems.map((item) =>
//                     item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//                 )
//             );
//         } else {
//             // Add new item to cart with quantity 1
//             setCartItems([...cartItems, { ...product, quantity: 1 }]);
//         }

//         try {
//             // Send add to cart request to backend (optional)
//             // Implement your backend logic here, e.g., using axios.post
//             console.log("Product added to cart (client-side):", product); // For debugging
//         } catch (error) {
//             console.error("Error adding product to cart:", error);
//             // Handle error appropriately, e.g., display a user-friendly message
//         }
//     }

//     useEffect(() => {
//         getProducts()
//     }, [])

//     const targetDate = new Date('2024-07-15');

//     return (
//         <>
//             <div className="container pb-10">
//                 <div className="flex justify-center pb-16">
//                     <div className="flex flex-col">
//                         <h1 id="specialOffers" className="text-4xl text-center font-bold">Special Offers</h1>
//                         <p className="">Save Now! Limited-Time Offers on Your Favorite Products!</p>
//                     </div>
//                 </div>
//                 <div className="flex justify-center pb-10">
//                     <Countdown targetDate={targetDate} />
//                 </div>
//                 <div className="container">
//                     <div className="flex flex-row justify-center">
//                         {isLoading ? (
//                             <>
//                                 {Array(3).fill().map((_, index) =>
//                                     <div key={index + 1} className="card w-96 h-96 bg-primary shadow-xl mx-10 text-white">
//                                         <div className="skeleton card-body">
//                                         </div>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <>
//                                 {products.slice(0, 3).map((product) =>
//                                     <div key={product.id} className="card w-80 bg-primary shadow-xl mx-10 text-white">
//                                         <figure><img className="w-[384px] h-[230px]" src={`${product.image || 'http://localhost:4000/images/no_image.jpg'}`} alt={product.nameProduct} /></figure>
//                                         <div className="card-body">
//                                             <div className="badge badge-secondary">NEW</div>
//                                             <h2 className="card-title truncate">{product.nameProduct}</h2>
//                                             <p className="truncate">{product.descProduct}</p>
//                                             <div className="card-actions justify-end">
//                                                 <div className="badge badge-secondary select-none">Genre</div>
//                                                 <div className="badge badge-secondary select-none">Genre</div>
//                                             </div>
//                                             <p className="font-bold text-md line-through opacity-80 text-red-500">{(`${FormatRupiah(parseInt(product.price) + parseInt(product.discount))}`)}</p>
//                                             <p className="font-bold text-xl text-black">{FormatRupiah(product.price)}</p>
//                                             <button onClick={() => addToCart(product)} className="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
//                                             </svg>
//                                                 Add to cart</button>
//                                         </div>
//                                     </div>
//                                 )
//                                 }
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div >
//         </>
//     )
// }

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FormatRupiah from "./toRupiah";
import Countdown from "./countdown";
import { CartContext } from "./cartContext"; // Import CartContext

export default function SpecialOffers() {
    const { addToCart } = useContext(CartContext); // Access addToCart function from CartContext
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/product');
            const discountedProducts = response.data.product.filter(product => product.discount > 0);
            setProducts(discountedProducts);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const targetDate = new Date('2024-07-15');

    return (
        <div className="container pb-10">
            <div className="flex justify-center pb-16">
                <div className="flex flex-col">
                    <h1 id="specialOffers" className="text-4xl text-center font-bold">Special Offers</h1>
                    <p className="">Save Now! Limited-Time Offers on Your Favorite Products!</p>
                </div>
            </div>
            <div className="flex justify-center pb-10">
                <Countdown targetDate={targetDate} />
            </div>
            <div className="container">
                <div className="flex flex-row justify-center">
                    {isLoading ? (
                        <>
                            {Array(3).fill().map((_, index) =>
                                <div key={index + 1} className="card w-96 h-96 bg-primary shadow-xl mx-10 text-white">
                                    <div className="skeleton card-body"></div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {products.slice(0, 3).map((product) =>
                                <div key={product.id} className="card w-80 bg-primary shadow-xl mx-10 text-white">
                                    <figure><img className="w-[384px] h-[230px]" src={`${product.image || 'http://localhost:4000/images/no_image.jpg'}`} alt={product.nameProduct} /></figure>
                                    <div className="card-body">
                                        <div className="badge badge-secondary">NEW</div>
                                        <h2 className="card-title truncate">{product.nameProduct}</h2>
                                        <p className="truncate">{product.descProduct}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-secondary select-none">Genre</div>
                                            <div className="badge badge-secondary select-none">Genre</div>
                                        </div>
                                        <p className="font-bold text-md line-through opacity-80 text-red-500">{FormatRupiah(parseInt(product.price) + parseInt(product.discount))}</p>
                                        <p className="font-bold text-xl text-black">{FormatRupiah(product.price)}</p>
                                        <button className="btn btn-secondary" onClick={() => addToCart(product)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
