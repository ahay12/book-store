import { useContext } from "react";
import FormatRupiah from "./toRupiah";
import { Link } from "react-router-dom";
import { CartContext } from "./cartContext";
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
    // const { cartItemsCount, totalBuy } = useContext(CartContext);
    const { cart, fetchCart, totalAmount, totalQuantity } = useContext(CartContext)
    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('jwtToken'); // Remove JWT token from local storage
        localStorage.removeItem('cart'); // Remove JWT token from local storage
        window.location.href = '/login'; // Redirect to login page
    };

    // Check admin role based on stored role in local storage
    // Decode the token to get the role
    const token = localStorage.getItem('jwtToken');
    let isLoggedIn = false;
    let isAdmin = false;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            isLoggedIn = true;
            isAdmin = decodedToken.role === 'admin';
        } catch (error) {
            console.error('Invalid token');
        }
    }
    // const cartItems = Array.isArray(fetchCart) ? fetchCart : [];
    // const totalQuantity = cartItems.reduce((acc, item) => acc + parseInt(item.quantity), 0);

    return (
        <>
            <div className="navbar fixed z-20 bg-gray-50 px-20 pb-4 shadow-md">
                <div className="navbar-start">
                    <div className="flex-1">
                        <a href="/" className="btn btn-ghost text-xl">Toko Buku</a>
                    </div>
                </div>
                <div className="navbar-center">
                    <label className="input input-primary flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" name="search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1">Menu</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <Link to={"/product"}>
                            <li><a>Product List</a></li>
                        </Link>
                        <li><a href="/#recommendedBooks">Recommended Books</a></li>
                        <li><a href="/#specialOffers">Special Offers</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex-none">
                        {isLoggedIn ? (
                            <div className="dropdown dropdown-end">
                                <Link to={'/checkout'}>
                                    <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
                                        <div className="indicator">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            {/* <span className="badge badge-sm indicator-item">{totalQuantity}</span> */}
                                        </div>
                                    </div>
                                    <div tabIndex="0" className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                        {/* <div className="card-body">
                                        <span className="font-bold text-lg">{totalQuantity} items</span>
                                        <span className="text-info"></span>
                                        <hr className="my-2 border-blue-gray-50" />
                                        <ul>
                                            {fetchCart?.map((item) => (
                                                <li key={item.id}>
                                                    <span>{item.nameProduct} (Qty: {item.quantity})</span>
                                                    <span>Total {FormatRupiah(totalAmount)}</span> Format price if needed
                                                    <hr className="my-2 border-blue-gray-50" />
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="card-actions">
                                            <Link to={"/checkout"}>
                                            <button className="btn btn-primary btn-block">View cart</button>
                                            </Link>
                                            </div>
                                        </div> */}
                                    </div>
                                </Link>
                            </div>
                        ) : (null)}

                        <div className="dropdown dropdown-end">
                            {isLoggedIn ? (
                                <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/login" className="btn btn-secondary mr-2">Login</Link>
                                    <Link to="/register" className="btn btn-primary">Register</Link>
                                </div>
                            )}
                            {isLoggedIn && (
                                <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    {isAdmin && (
                                        <li><a href="/admin">Admin</a></li>
                                    )}
                                    <li><a>Settings</a></li>
                                    <li><a onClick={logout}>Logout</a></li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}