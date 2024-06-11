import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
    const [nameProduct, setNameProduct] = useState('')
    const [price, setPrice] = useState('')
    const { id } = useParams();
    const redirect = useNavigate('')

    const updateProduct = async (e) => {
        e.preventDefault();
        // console.log('Data:', { nameProduct, price });
        await axios.patch(`http://localhost:4000/product/${id}`, {
            id,
            nameProduct,
            price,

        })
        // console.log(nameProduct, price);

        redirect("/");
    }

    useEffect(() => {
        getProductById()
    }, [])
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:4000/product/${id}`)
        setNameProduct(response.data.nameProduct)
        setPrice(response.data.price)
        // console.log('URL', response)
    }

    return (
        <div className="grid mt-32 justify-items-center">
            <form onSubmit={updateProduct}>
                <div className="field">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Name Book</span>
                        </div>
                        <input type="text" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} placeholder="Name Book" className="input input-bordered w-full max-w-md" />
                    </label>
                </div>
                <div className="field">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Price</span>
                        </div>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="input input-bordered w-full max-w-md" />
                    </label>
                </div>
                <div className="field label form-control w-full max-w-xs">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt">
                        <button className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                            </svg>
                        </button>
                    </span>
                </div>
            </form>
        </div>
    )
}
