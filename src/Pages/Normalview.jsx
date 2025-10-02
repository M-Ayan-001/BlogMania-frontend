import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = import.meta.env.VITE_API_URL;

const Normalview = () => {

    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        axios.get(`${API}/blog/viewblog/${id}`, { withCredentials: true })
            .then((res) => {
                setTitle(res.data.blog.title)
                setDescription(res.data.blog.description)
                console.log(res.data.blog);
                console.log(res.data.owner);

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center mt-25'>
                <form className='flex flex-col w-full items-center justify-center gap-3'>
                    <input readOnly value={title} className='outline-none w-150 block rounded-md px-5 py-2 border-3 text-center font-semibold tracking-tighter shadow-xl/20' type="text" placeholder='Enter Blog Name' />
                    <textarea readOnly value={description} className='outline-none w-300 h-85 block rounded-md px-5 py-2 border-3 resize-none font-semibold tracking-tighter shadow-xl/20' placeholder='Write your blog' ></textarea>
                    <Link to='/' className='outline-none text-center font-semibold tracking-tighter px-5 py-2 border-3 border-black rounded-md shadow-xl/20 hover:bg-blue-600 hover:text-white transition-colors duration-300'>Close</Link>
                </form>
            </div>
        </>
    )
}

export default Normalview