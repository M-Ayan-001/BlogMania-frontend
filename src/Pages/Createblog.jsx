import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../components/Navbar'

const API = import.meta.env.VITE_API_URL;

const Createblog = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    const navigate = useNavigate()

    const handleCreateBlog = (e) => {
        e.preventDefault();

        if (!file) return alert("Choose a file first");

        const formData = new FormData()
        formData.append("image", file)
        formData.append("title", title)
        formData.append("description", description)

        axios.post(`${API}/blog/createblog`, formData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((res) => {
                alert(res.data.message)
                if(res.data.route){
                    navigate("/")
                }else{
                    navigate("/login")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <Navbar/>
            <div className='flex items-center justify-center mt-25'>
                <form onSubmit={(e) => handleCreateBlog(e)} className='flex flex-col w-full items-center justify-center gap-3'>
                    <input onChange={(e) => setFile(e.target.files[0])} className='outline-none w-70 block rounded-md px-5 py-2 border-3 text-center font-semibold tracking-tighter shadow-xl/20' type="file" />
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className='outline-none w-150 block rounded-md px-5 py-2 border-3 text-center font-semibold tracking-tighter shadow-xl/20' type="text" placeholder='Enter Blog Name' />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='outline-none w-300 h-70 block rounded-md px-5 py-2 border-3 resize-none font-semibold tracking-tighter shadow-xl/20' placeholder='Write your blog'></textarea>
                    <button type='submit' className='outline-none text-center font-semibold tracking-tighter px-5 py-2 border-3 border-black rounded-md shadow-xl/20 hover:bg-blue-600 hover:text-white transition-colors duration-300'>Create</button>
                </form>
            </div>
        </>
    )
}

export default Createblog