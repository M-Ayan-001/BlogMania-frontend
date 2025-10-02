import React, { use } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API = import.meta.env.VITE_API_URL;

const Specialview = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)


    useEffect(() => {
        axios.get(`${API}/blog/viewblog/${id}`, { withCredentials: true })
            .then((res) => {
                setTitle(res.data.blog.title)
                setDescription(res.data.blog.description)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    const handleUpdate = () => {

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)

        if (file) {
            formData.append("image", file)
        }

        axios.put(`${API}/blog/updateblog/${id}`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => {
                alert(res.data.message)
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDelete = () => {
        axios.delete(`${API}/blog/deleteblog/${id}`, {withCredentials: true})
        .then((res) => {
            alert(res.data.message)
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center mt-25'>
                <form className='flex flex-col w-full items-center justify-center gap-3'>
                    <input onChange={(e) => setFile(e.target.files[0])} className='outline-none w-70 block rounded-md px-5 py-2 border-3 text-center font-semibold tracking-tighter shadow-xl/20' type="file" />
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className='outline-none w-150 block rounded-md px-5 py-2 border-3 text-center font-semibold tracking-tighter shadow-xl/20' type="text" placeholder='Enter Blog Name' />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='outline-none w-300 h-70 block rounded-md px-5 py-2 border-3 resize-none font-semibold tracking-tighter shadow-xl/20' placeholder='Write your blog'></textarea>
                    <div className='flex gap-5'>
                        <button type='button' onClick={() => handleUpdate()} className='outline-none text-center font-semibold tracking-tighter px-5 py-2 border-3 border-black rounded-md shadow-xl/20 hover:bg-blue-600 hover:text-white transition-colors duration-300'>Update</button>
                        <button type='button' onClick={() => handleDelete()} className='outline-none text-center font-semibold tracking-tighter px-5 py-2 border-3 border-black rounded-md shadow-xl/20 hover:bg-red-600 hover:text-white transition-colors duration-300'>Delete</button>
                        <Link to='/' className='outline-none text-center font-semibold tracking-tighter px-5 py-2 border-3 border-black rounded-md shadow-xl/20 hover:bg-blue-600 hover:text-white transition-colors duration-300'>Close</Link>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Specialview