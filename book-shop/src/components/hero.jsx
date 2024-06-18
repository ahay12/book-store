import { useContext, useEffect, useState } from "react"
import axios from "axios"
import FormatRupiah from "./toRupiah"
import CartContext from "./cart"


export default function Hero() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { addToCart } = useContext(CartContext)

    const getProducts = async () => {
        const response = await axios.get('http://localhost:4000/product')
        setProducts(response.data.product)
        setIsLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
            <div className="w-full h-auto">
                {/* <div className="absolute -z-10 top-20 right-0 left-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#ffcb3a" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,197.3C384,224,480,256,576,250.7C672,245,768,203,864,160C960,117,1056,75,1152,90.7C1248,107,1344,181,1392,218.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                    </svg>
                    <svg className="relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#ffcb3a" fillOpacity="1" d="M0,288L80,266.7C160,245,320,203,480,176C640,149,800,139,960,128C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div> */}
                {/* Left */}
                <div className="hero min-h-screen">
                    <div className="hero-content grid grid-cols-3 mt-16">
                        {isLoading ? (
                            <div className="skeleton w-[700px] h-[400px] bg-primary col-span-2">
                            </div>
                        ) : (
                            <div className="container col-span-2">
                                <img className="rounded-2xl" src="http://localhost:4000/images/hero.jpg" alt="discount" />
                            </div>
                        )}
                        {/* Right */}
                        <div className="flex flex-col">
                            <h1 className="text-2xl ml-2 badge badge-primary text-white h-auto"><span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-6">
                                <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                            </svg>
                            </span>New Released</h1>
                            {isLoading ? (
                                <>
                                    <div className="carousel carousel-center max-w-lg p-4 space-x-4 bg rounded-box">
                                        {Array(4).fill().map((_, index) =>
                                            <div key={index + 1} className="skeleton carousel-item">
                                                <div className="skeleton card w-96 bg-base-100 shadow-xl">
                                                    <figure className="flex ml-4 mt-6 skeleton w-[350px] h-[250px]"></figure>
                                                    <div className="card-body">
                                                        <span className="skeleton w-[320px] h-[20px]" />
                                                        <span className="skeleton w-[220px] h-[20px]" />
                                                        <span className="skeleton w-[310px] h-[20px]" />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                </>
                            ) : (
                                <div className="carousel carousel-center max-w-lg p-4 space-x-4 bg rounded-box">
                                    {products.slice(0, 4).map((product) => (
                                        <div key={product.id} className="carousel-item">
                                            <div className="card w-56 bg-base-100 shadow-xl">
                                                <figure><img className="w-[224px] h-[270px]" src={`${product.image || 'http://localhost:4000/images/no_image.jpg'}`} alt={product.nameProduct} /></figure>
                                                <div className="card-body">
                                                    <h2 className="card-title truncate">{product.nameProduct}</h2>
                                                    <p>{FormatRupiah(product.price)}</p>
                                                    <div className="card-actions justify-end">
                                                        <button onClick={() => addToCart(product)} className="btn btn-primary">Buy</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
