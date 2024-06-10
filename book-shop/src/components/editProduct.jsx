import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
    const [nameProduct, setNameProduct] = useState('')
    const [price, setPrice] = useState('')
    const history = useNavigate('')
    const { id } = useParams();

    const editProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch('http://localhost:4000/product', {
                nameProduct: nameProduct,
                price: price,
            })

            if (response.status === 200) {
                // Product updated successfully
                console.log("Product updated successfully!");
                // You can redirect or perform other actions here
            } else {
                // Handle other status codes (e.g., 400 for bad request)
                console.error("Error updating product:", response.data);
            }
        } catch (error) {
            // Handle other errors
            console.error("Error updating product:", error);
        }

        history("/");
    }

    useEffect(() => {
        getProductById()
    }, [])
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:4000/product/${id}`)
        setNameProduct(response.data.nameProduct)
        setPrice(response.data.price)
    }

    return (
        <div className="grid justify-items-center">
            <form onSubmit={editProduct}>
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
