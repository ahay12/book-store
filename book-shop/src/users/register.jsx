import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const push = useNavigate('')

    // console.log(username);
    // console.log(password);

    const createdUser = async (e) => {
        e.preventDefault()

        const response = await axios.post('http://localhost:4000/register', {
            username, password,
        })
        console.log(response.data);
        push('/login')

    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={createdUser} className="card-body" method="post">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">username</span>
                            </label>
                            <input type="text" placeholder="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-primary" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-primary" required />
                            <label className="label">
                                <a href="/login" className="label-text-alt link link-hover">Login</a>
                            </label>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
