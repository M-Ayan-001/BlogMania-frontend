import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL;


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        axios
            .post(`${API}/user/login`, { email: email, password: password }, { withCredentials: true })
            .then((res) => {
                alert(res.data.message)
                navigate("/", { replace: true })
                
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }

    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center text-black'>
            <div className='w-1/3 h-96 flex flex-col rounded-md justify-center items-center bg-zinc-500/50 backdrop-blur-sm p-10 border-3 border-dashed shadow-xl/20'>
                <h1 className='text-3xl mb-5 font-bold'>User Login</h1>
                <form className='flex flex flex-col justify-center items-center gap-3' onSubmit={handleLogin}>
                    <input className='border-2 border-black w-70 block rounded-md outline-none px-5 py-2 bg-zinc-700/50 backdrop-blur-sm text-white' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='border-2 border-black w-70 block rounded-md outline-none px-5 py-2 bg-zinc-700/50 backdrop-blur-sm text-white' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='mt-5 bg-white px-3 py-1 rounded-md font-semibold border-2 shadow-xl/20 hover:bg-blue-600 transition-colors duration-300' type='submit' >Login</button>
                    <Link className='text-center font-semibold text-black mt-2 border-b-2 border-transparent hover:border-black transition-border duration-200 cursor-pointer' to="/register">New user? Register</Link>
                    <Link className='text-center font-semibold text-black cursor-pointer' to="/">←</Link>
                </form>
            </div>
        </div>
    )
}

export default Login