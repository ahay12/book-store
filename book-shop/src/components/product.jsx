import { useEffect, useState } from "react";
import NavBar from "./navBar";
import FormatRupiah from "./toRupiah";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function Product() {
    const [products, setProducts] = useState([])
    const [value, setValue] = useState(1000000)

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 12
    const endOffset = itemOffset + itemsPerPage;

    // const items = Array(100).fill()
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


    const getProducts = async () => {
        const response = await axios.get('http://localhost:4000/product')
        setProducts(response.data.product)
        // setIsLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

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
                        <div className="grid grid-cols-4 gap-x-2 gap-y-5">
                            {currentItems.map((product) => (
                                <div key={product.id} className="w-[230px] h-[320px] bg-primary rounded-lg">
                                    <img className="w-[230px] h-[220px] rounded-lg  " src={`${product.image || 'http://localhost:4000/images/no_image.jpg'}`} alt={product.name} />
                                    <div className="ml-2 mt-2">
                                        <p>{product.nameProduct}</p>
                                        <p>{FormatRupiah(product.price)}</p>
                                    </div>
                                </div>
                            ))}
                            {/* {currentItems.map((_, index) => (
                                <div key={index + 1} className="w-[200px] h-[280px] bg-primary rounded-lg">
                                    <img className="w-[230px] h-[200px] rounded-lg" src={`${'http://localhost:4000/images/no_image.jpg' || 'http://localhost:4000/images/no_image.jpg'}`} alt="" />
                                    <span className="w-[50px] h-[50x]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:fill-pink-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                    </span>
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                </div>
                            ))}
                             */}
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
            </div>
        </>
    )
}
