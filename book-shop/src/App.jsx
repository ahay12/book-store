import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import NavBar from './components/navBar';
import ProductList from './components/productList';
import AddProduct from './components/addProduct';
import EditProduct from './components/editProduct';

export default function App() {
  return (
    <>
      <NavBar />
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/edit/:id' element={<EditProduct />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}
