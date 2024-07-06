// import axios from "axios"
// import { useEffect, useState } from "react"
import { useState } from "react"
import NavBar from "./navBar"
import { useParams } from "react-router-dom"

export default function ProductDetail() {
    const [products, setProducts] = useState(null)
    const { id } = useParams()

    const getProducts = async () => {
        const response = await axios.get(`http://localhost:4000/product/${id}`)
        setProducts(response.data.product)
        // setIsLoading(false)
    }

    console.log(products.product)
    useEffect(() => {
        getProducts()
    }, [productId])

    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        if (count >= 1) {
            setCount(count - 1)
        }
    }

    const [count, setCount] = useState(0)

    return (
        <>
            <NavBar />
            <div className="container pt-36">
                <div className="grid grid-flow-col gap-10">
                    <div>
                        <img className="w-72 h-80" src="http://localhost:4000/images/Solo_Leveling.png" alt="images" />
                    </div>
                    <div className="pl-5">
                        <div className="pb-5">
                            <h1 className="text-3xl font-bold">Solo Leveling</h1>
                        </div>
                        <div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Eget velit aliquet sagittis id consectetur purus ut faucibus. Pulvinar
                                pellentesque habitant morbi tristique senectus et netus et. Viverra accumsan
                                in nisl nisi. Fermentum et sollicitudin ac orci phasellus egestas tellus. Imperdiet
                                dui accumsan sit amet nulla facilisi morbi tempus. Donec enim diam vulputate ut. Porttitor
                                massa id neque aliquam vestibulum morbi. Sem integer vitae justo eget magna fermentum
                                iaculis eu. Consequat ac felis donec et odio pellentesque diam. Viverra nibh cras
                                pulvinar mattis nunc sed. Dignissim enim sit amet venenatis urna. Venenatis lectus
                                magna fringilla urna porttitor rhoncus dolor purus non. Ac ut consequat semper
                            </p>
                        </div>
                        <div className="grid grid-flow-col py-10">
                            <div>
                                <p>Writen</p>
                                <p className="font-bold">Name Author</p>
                            </div>
                            <div>
                                <p>Publisher</p>
                                <p className="font-bold">name Publisher</p>
                            </div>
                            <div>
                                <p>Year</p>
                                <p className="font-bold">2024</p>
                            </div>
                        </div>
                        <div className="grid grid-flow-col py-10">
                            <div>
                                <p className="font-bold">$19.99</p>
                            </div>
                            <div>
                                <button className="btn btn-primary" onClick={decrement}>-</button>
                                <p className="font-bold btn btn-primary" disabled>{count}</p>
                                <button className="btn btn-primary" onClick={increment}>+</button>
                            </div>
                            <div>
                                <button className="btn btn-primary">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
