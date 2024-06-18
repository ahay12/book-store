import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import ProductList from './components/productList';
import AddProduct from './components/addProduct';
import EditProduct from './components/editProduct';
import LandingPage from './components/landingPage';
import Login from './users/login';
import Product from './components/product';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/product-list' element={<ProductList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product' element={<Product />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/edit/:id' element={<EditProduct />} />
        </Routes>
      </Router>
    </>
  )
}
