import { useEffect, useState } from "react"
import axios from "axios"
import FormatRupiah from "./toRupiah"

export default function Hero() {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const response = await axios.get('http://localhost:4000/product')
        setProducts(response.data.product)
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
            <div className="-z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#FFF9D0" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,197.3C384,224,480,256,576,250.7C672,245,768,203,864,160C960,117,1056,75,1152,90.7C1248,107,1344,181,1392,218.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#FFF9D0" fillOpacity="1" d="M0,288L80,266.7C160,245,320,203,480,176C640,149,800,139,960,128C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
            </div>
            {/* Left */}
            <div className="z-10 -mt-[700px] hero min-h-screen bg-[white]">
                <div className="hero-content grid grid-cols-2">
                    <div className="mr-32">
                        <h1 className="text-3xl m-3 h-auto badge badge-[#6e6e6e]"><span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00802b" className="size-8">
                            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                        </svg>
                        </span>The Best Online Book Store</h1>
                        <h1 className="text-5xl m-3"><span className="text-blue-600 font-bold">Explore </span>Our Favorite Book</h1>
                        <div>
                            <button className="w-[148px] text-xl m-3 bg-[#00802b] text-white btn btn-square">Shop Now<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                            </svg>
                            </span></button>
                            <button className="w-[128px] text-xl m-3 ml-14 underline">Explore Store</button>
                        </div>
                    </div>
                    {/* Right */}
                    <div>
                        <h1 className="text-2xl ml-2 badge h-auto"><span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-6">
                            <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                        </svg>
                        </span>New Released</h1>
                        <div className="carousel carousel-center max-w-lg p-4 space-x-4 bg rounded-box">
                            {products.slice(0, 4).map((product) => (
                                <div key={product.id} className="carousel-item">
                                    <div className="card w-96 bg-base-100 shadow-xl">
                                        <figure><img src="https://img.freepik.com/free-vector/collection-abstract-annual-report-templates_23-2148820620.jpg?t=st=1718082371~exp=1718085971~hmac=b089107b6a8bde807c67e45e87e23bd9a2deb430b93944d043496b4674ab8a8c&w=1060" alt="Shoes" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{product.nameProduct}</h2>
                                            <p>{FormatRupiah(product.price)}</p>
                                            <div className="card-actions justify-end">
                                                <button className="btn btn-primary">Buy</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div></>
    )
}
