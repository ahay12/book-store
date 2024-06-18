import { useEffect, useState, } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';
import FormatRupiah from './toRupiah';


export default function ProductList() {

    const [products, setProducts] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10
    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        getProducts()
    }, [])
    const getProducts = async () => {
        const response = await axios.get('http://localhost:4000/product')
        setProducts(response.data.product)
    }
    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:4000/product/${id}`)
        getProducts()
    }


    return (
        <>

            <Helmet>
                <title>Product List | Book Store</title>
            </Helmet>
            <div className='container'>
                <div className="navbar bg-base-100 fixed z-10">
                    <div className="flex-2">
                        <Link to={'/add'}><button className='btn btn-primary'>Add Book</button></Link>
                    </div>
                </div>
                <div className="overflow-x-auto h-screen pt-20">
                    <div className='flex items-center place-content-center pb-5'>
                        <h1 className='text-xl'>Product List</h1>
                    </div>
                    <table className="table table-xs border-collapse border-slate-500">
                        {/* head */}
                        <thead>
                            <tr className='bg-primary'>
                                <th className='border border-slate-600'>No</th>
                                <th className='border border-slate-600'>Image</th>
                                <th className='border border-slate-600'>Name Book</th>
                                <th className='border border-slate-600'>Author</th>
                                <th className='border border-slate-600'>Description</th>
                                <th className='border border-slate-600'>Price</th>
                                <th className='border border-slate-600'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((product, index) => (
                                <tr key={product.id} className='truncate'>
                                    <td className='border border-slate-600 bg-primary bg-opacity-75'>{index + 1}</td>
                                    <td><img className='w-36 h-32 object-fill border border-slate-600 ' src={`${product.image}`} alt={product.nameProduct} /></td>
                                    <td className='border border-slate-600 bg-primary bg-opacity-75'>{product.nameProduct}</td>
                                    <td className='border border-slate-600'>{product.author}</td>
                                    <td className='border border-slate-600 bg-primary bg-opacity-75'>{`${product.descProduct}`.slice(0, 50) + '...'}</td>
                                    <td className='border border-slate-600 '>{FormatRupiah(product.price)}</td>
                                    <td className='bg-primary bg-opacity-75'>
                                        <Link to={`/edit/${product.id}`}>
                                            <button className="btn btn-secondary mx-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                            </button>
                                        </Link>
                                        <button onClick={() => deleteProduct(product.id)} className="btn bg-red-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div >
                        <ReactPaginate
                            className='flex items-center place-content-center'
                            breakLabel="..."
                            nextLabel=">>>"
                            onPageChange={handlePageClick}
                            // pageRangeDisplayed={1}
                            pageCount={pageCount}
                            previousLabel="<<<"
                            renderOnZeroPageCount={null} />

                    </div>
                </div>
            </div>
        </>
    )

}
