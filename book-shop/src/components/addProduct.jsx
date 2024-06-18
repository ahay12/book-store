import { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ValidateForm from "./alertForm";

export default function AddProduct() {
    const [nameProduct, setNameProduct] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [descProduct, setDescProduct] = useState('')
    const [author, setAuthor] = useState('')
    const [discount, setDiscount] = useState('0')
    const push = useNavigate('')

    const handleSubmit = async (event) => {
        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('nameProduct', nameProduct)
            formData.append('descProduct', descProduct)
            formData.append('author', author)
            formData.append('price', price)
            formData.append('discount', discount)
            if (!ValidateForm(event)) {
                return
            }
            const response = await axios.post('http://localhost:4000/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setNameProduct(response.data)
            push('/product-list')
            // console.log('price', price);
            // console.log(discount);
        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        <div className="justify-items-center h-screen container place-content-center">
            <div id="error"></div>
            <form id="myForm" className="grid grid-cols-3 gap-10" onSubmit={handleSubmit} autoComplete="off">
                <div className="field">
                    <label className="form-control">
                        <div id="error" className="label">
                            <span className="label-text">Image</span>
                        </div>
                        <input id="imageInput" type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/jpeg,image/png,image/webp" name="imageBook" className="file-input file-input-primary w-full max-w-md" />
                        <label htmlFor="imageInput">Image (JPG or PNG, Max 1MB)</label>
                    </label>
                </div>
                <div className="field">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Name Book</span>
                        </div>
                        <input id="nameProduct" type="text" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} placeholder="Name Book" className="input input-primary w-full max-w-md" />
                    </label>
                </div>
                <div className="field">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Author</span>
                        </div>
                        <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="input input-primary w-full max-w-md" />
                    </label>
                </div>
                <div className="field">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <input id="descProduct" type="text" value={descProduct} onChange={(e) => setDescProduct(e.target.value)} placeholder="Description" className="input input-primary w-full max-w-md" />
                    </label>
                </div>
                <div className="field">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Price</span>
                        </div>
                        <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="100xxxx" className="input input-primary w-full max-w-md" />
                    </label>
                </div>
                <div className="field">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Discount</span>
                            <p className="text-red-600 text-xs">*optional</p>
                        </div>
                        <input id="discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="100xxx" className="input input-primary w-full max-w-md" />
                    </label>
                </div>
                <div></div>
                <div className="field form-control">
                    <button className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}