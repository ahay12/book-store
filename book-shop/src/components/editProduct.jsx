import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
    const [nameProduct, setNameProduct] = useState('')
    const [price, setPrice] = useState('')
    const [descProduct, setDescProduct] = useState('')
    const [image, setImage] = useState('')
    const [author, setAuthor] = useState('')
    const [discount, setDiscount] = useState('0')


    const { id } = useParams();
    const push = useNavigate('')

    const updateProduct = async (e) => {
        e.preventDefault();
        // console.log('Data:', { nameProduct, price });
        await axios.patch(`http://localhost:4000/product/${id}`, {
            id,
            image,
            nameProduct,
            author,
            descProduct,
            price,
            discount,

        })
        // console.log(nameProduct, price);

        push("/product-list");
    }

    useEffect(() => {
        getProductById()
    }, [])
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:4000/product/${id}`)
        // setImage(response.data.image)
        setNameProduct(response.data.nameProduct)
        setDescProduct(response.data.descProduct)
        setAuthor(response.data.author)
        setPrice(response.data.price)
        setDiscount(response.data.discount)
    }

    return (
        <>
            <div className="justify-items-center h-screen container place-content-center">
                <form onSubmit={updateProduct} className="grid grid-cols-3 gap-10">
                    <div className="field">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Image</span>
                            </div>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/jpeg" name="imageBook" className="file-input file-input-primary w-full max-w-md" disabled />
                        </label>
                    </div>
                    <div className="field">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Name Book</span>
                            </div>
                            <input type="text" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} placeholder="Name Book" className="input input-primary w-full max-w-md" />
                        </label>
                    </div>
                    <div className="field">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Author</span>
                            </div>
                            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="input input-primary w-full max-w-md" />
                        </label>
                    </div>
                    <div className="field">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <input type="text" value={descProduct} onChange={(e) => setDescProduct(e.target.value)} placeholder="Description" className="input input-primary w-full max-w-md" />
                        </label>
                    </div>
                    <div className="field">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="input input-primary w-full max-w-md" />
                        </label>
                    </div>
                    <div className="field">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Discount</span>
                            </div>
                            <input id="discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Discount" className="input input-primary w-full max-w-md" />
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
        </>
    )
}
