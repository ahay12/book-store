import { useEffect, useState } from "react";
import NavBar from "./navBar";
import FormatRupiah from "./toRupiah";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Footer from "./footer";
import { Link } from "react-router-dom";

export default function Product() {
    const [products, setProducts] = useState([])
    const [value, setValue] = useState(1000000)
    const [q, setQ] = useState('')
    console.log(q)

    const [itemOffset, setItemOffset] = useState(0)
    const itemsPerPage = 12
    const endOffset = itemOffset + itemsPerPage

    // const items = Array(100).fill()
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)

    const currentItems = products.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(products.length / itemsPerPage)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };


    const getProducts = async () => {
        const response = await axios.get('http://localhost:4000/product')
        setProducts(response.data.product)
        // console.log(response.data.product)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const handleSearchChange = (event) => {
        setQ(event.target.value?.toLowerCase()); // Convert search term to lowercase for case-insensitive search
    }

    const filteredProducts = products.filter((product) =>
        product.nameProduct?.toLowerCase().includes(q) // Search by product name (adjust based on your data structure)
    )
    // console.log(filteredProducts)

    const markerStyle = {
        left: `${value / 100 * 100}%`,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',

    }
    return (
        <>
            <NavBar />
            <div className="container pt-36">
                <div className="flex flex-row">
                    <div className="left-0">
                        <h1 className="text-2xl">Filter</h1>
                        <div className="w-[250px] collapse collapse-arrow border border-primary bg-base-200">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-2xl font-medium">
                                All Categories
                            </div>
                            <div className="collapse-content">
                                <div className="form-control">
                                    <label className="label justify-start cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                        <span className="label-text ml-2">Drama</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label justify-start cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                        <span className="label-text ml-2">Sci-fi</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-[250px] collapse collapse-arrow border border-primary bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-2xl font-medium">
                                Books Format
                            </div>
                            <div className="collapse-content">
                                <div className="form-control">
                                    <label className="label justify-start cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                        <span className="label-text ml-2">E-Book</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label justify-start cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                        <span className="label-text ml-2">Best Quality</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-[250px] collapse collapse-arrow border border-primary bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-2xl font-medium">
                                Years
                            </div>
                            <div className="collapse-content">
                                <div className="form-control">
                                    <label className="label justify-start cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                        <span className="label-text ml-2">2024</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label justify-start cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                        <span className="label-text ml-2">2023</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label justify-start cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                        <span className="label-text ml-2">2022</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label justify-start cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-primary" />
                                        <span className="label-text ml-2">2021</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-[250px] collapse collapse-arrow border border-primary bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-2xl font-medium">
                                Price
                            </div>
                            <div className="collapse-content">
                                <div className="range-container">
                                    <input
                                        type="range"
                                        min={0}
                                        max={1000000}
                                        value={value}
                                        className="range range-primary"
                                        step="25000"
                                        onChange={handleChange}
                                    />
                                    <div className="w-full flex justify-between text-xs px-2">
                                        <span style={markerStyle}></span>
                                        <span style={markerStyle}></span>
                                        <span style={markerStyle}></span>{FormatRupiah(value)}
                                        <span style={markerStyle}></span>
                                        <span style={markerStyle}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-5">
                        <h1 className="text-2xl">Books</h1>
                        <div className="py-10">
                            <label className="input input-bordered flex items-center gap-2">
                                <input value={q} onChange={handleSearchChange} type="text" className="grow" placeholder="Search" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </label>
                            {/* <div>
                                {filteredProducts.length > 0 ? (
                                    <ul>
                                        {filteredProducts.map((product) => (
                                            <div key={product.id}>
                                                <img src={product.image} alt="" />
                                                <p>{product.nameProduct}</p>
                                            </div>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No results found</p>
                                )}
                            </div> */}
                        </div>
                        <div className="grid grid-cols-4 gap-x-2 gap-y-5">
                            {filteredProducts.length > 0 ? (
                                <>
                                    {filteredProducts.map((product) => (
                                        <div key={product.id} className="w-[230px] h-auto bg-primary rounded-lg">
                                            <Link to={`/product-detail/${product.id}`}>
                                                <img className="w-[230px] h-[280px] rounded-lg  " src={`${product.image || 'http://localhost:4000/images/no_image.jpg'}`} alt={product.name} />
                                                <div className="ml-2 mt-2 text-center">
                                                    <p>{product.nameProduct}</p>
                                                    <p>{FormatRupiah(product.price)}</p>
                                                    <div className="rating">
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p>Not results found</p>
                            )}
                        </div>
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
            </div >
            <Footer />
        </>
    )
}
