import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import blogmania from '../assets/Blog-Mania.png'

const API = import.meta.env.VITE_API_URL;

const Navbar = () => {

    const navigate = useNavigate()

    const [id, setId] = useState('')

    useEffect(() => {
        axios.get(`${API}/user/getuser`, { withCredentials: true })
            .then((res) => {
                if (res.data.user) {
                    setId(res.data.user._id)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })

    const handleLogout = () => {
        axios.get(`${API}/user/logout`, { withCredentials: true })
            .then((res) => {
                alert(res.data.message)
                setId('')
                navigate('/', { replace: true })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <>
            <nav className="fixed top-0 left-0 z-50 w-full bg-white text-black px-6 py-3 border-b-3 shadow-xl/20 flex items-center justify-between">
                {/* Left: Logo + Links */}
                <div className="flex items-center space-x-8">
                    <div className="w-40 h-12 items-center" ><Link to='/'><img className="w-full h-full" src={blogmania} /></Link></div>
                    <ul className="flex space-x-6">
                        <Link to="/blogcreation"><li className="text-black text-center font-semibold border-b-2 border-transparent hover:border-black cursor-pointer">Write Blogs</li></Link>
                        <Link to={`/myblogs/${id}`}  ><li className="text-black text-center font-semibold border-b-2 border-transparent hover:border-black cursor-pointer">My Blogs</li></Link>
                        <Link to={`/mylikedblogs/${id}`}><li className="text-black text-center font-semibold border-b-2 border-transparent hover:border-black cursor-pointer">Liked Blogs</li></Link>
                        <Link to={`/mydislikedblogs/${id}`}><li className="text-black text-center font-semibold border-b-2 border-transparent hover:border-black cursor-pointer">Disliked Blogs</li></Link>
                        <Link to="#"><li className="text-black text-center font-semibold border-b-2 border-transparent hover:border-black cursor-pointer">Donate</li></Link>
                    </ul>
                </div>

                {/* Right: Search + Icons */}
                <div className="flex items-center space-x-6 relative">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-white text-black placeholder-gray-400 rounded-md pl-8 pr-3 py-1 border-2 outline-none"
                        />
                        <svg
                            className="w-4 h-4 absolute left-2 top-2.5 text-black"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                        </svg>
                    </div>

                    <div className="flex gap-8 justify-center items-center">

                        {id ? (
                            <button onClick={() => handleLogout()} type="button" className="font-semibold text-center border-b-2 border-transparent hover:border-black cursor-pointer">Logout</button>
                        ) : (
                            <Link to='/login' className="font-semibold text-center border-b-2 border-transparent hover:border-black cursor-pointer">Login</Link>
                        )}

                    </div>



                </div>
            </nav>
        </>
    )
}

export default Navbar