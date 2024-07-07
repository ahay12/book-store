// import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
// import ProductList from './admin/productList';
// import AddProduct from './components/addProduct';
// import EditProduct from './components/editProduct';
// import LandingPage from './components/landingPage';
// import Login from './users/login';
// import Product from './components/product';
// import ProductDetail from './components/productDetail';
// import Register from './users/register';
// import { DefaultSidebar } from './admin/layoutAdmin';
// import ProtectedRoute from './middleware/protectedRoute';

// export default function App() {
//   const isAdmin = localStorage.getItem('role') === 'admin';
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path='/' element={<LandingPage />} />
//           {/* <Route path='/admin/product-list' element={<ProductList />} /> */}
//           <Route path='/login' element={<Login />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='/admin' element={<DefaultSidebar />} />
//           {/* <Route path='/admin' element={
//             <ProtectedRoute>
//               <DefaultSidebar />
//             </ProtectedRoute>
//           } /> */}
//           {/* Conditionally render admin routes only if isAdmin */}
//           {isAdmin && (
//             <Route path='/admin' element={<DefaultSidebar />} />
//           )}
//           {/* Protected routes example */}
//           {isAdmin && (
//             <Route path='/admin/product-list' element={<ProductList />} />
//           )}
//           {/* Public routes */}

//           <Route path='/product' element={<Product />} />
//           {/* <Route path='/product/:id' element={<ProductDetail />} /> */}
//           <Route path='/product-detail/:id' element={<ProductDetail />} />
//           <Route path='/add' element={<AddProduct />} />
//           <Route path='/edit/:id' element={<EditProduct />} />
//         </Routes>
//       </Router>
//     </>
//   )
// }


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './admin/productList';
import AddProduct from './components/addProduct';
import EditProduct from './components/editProduct';
import LandingPage from './components/landingPage';
import Login from './users/login';
import Product from './components/product';
import ProductDetail from './components/productDetail';
import Register from './users/register';
import { DefaultSidebar } from './admin/layoutAdmin';
import { jwtDecode } from 'jwt-decode';
import { UserList } from './admin/userList';
import { CartProvider } from './components/cartContext';
import Checkout from './components/checkout';

const ProtectedAdminRoute = ({ children }) => {
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
  return isAdmin || isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={
            <ProtectedAdminRoute>
              <CartProvider>
                <Checkout />
              </CartProvider>
            </ProtectedAdminRoute>} />
          <Route path="/product" element={
            <CartProvider>
              <Product />
            </CartProvider>} />
          <Route path="/product-detail/:id" element={
            <CartProvider>
              <ProductDetail />
            </CartProvider>} />
          <Route path="/add" element={
            <ProtectedAdminRoute>
              <AddProduct />
            </ProtectedAdminRoute>} /> {/* Redirect non-admins to login */}
          <Route path="/edit/:id" element={
            <ProtectedAdminRoute>
              <EditProduct />
            </ProtectedAdminRoute>} /> {/* Redirect non-admins to login */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <DefaultSidebar />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
