import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import like from '../assets/like-svgrepo-com.svg'
import dislike from '../assets/dislike-svgrepo-com.svg'
import view from '../assets/open-book-svgrepo-com.svg'

const API = import.meta.env.VITE_API_URL;

const Blogcard = (props) => {

    const navigate = useNavigate()

    const handleblogview = (id) => {

        axios.get(`${API}/blog/viewblog/${id}`, { withCredentials: true })
            .then((res) => {
                if (res.data.owner) {
                    alert(res.data.message)
                    navigate(`/special/${res.data.blog._id}`)
                } else {
                    alert(res.data.message)
                    console.log(res.data.owner);
                    console.log(res.data.blog);
                    navigate(`/normal/${res.data.blog._id}`)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handlebloglike = (id) => {
        axios.put(`${API}/blog/like/${id}`, {}, { withCredentials: true })
            .then((res) => {
                alert(res.data.message)
                if (!res.data.user) {
                    navigate('/login')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleblogdislike = (id) => {
        axios.put(`${API}/blog/dislike/${id}`, {}, { withCredentials: true })
            .then((res) => {
                alert(res.data.message)
                if (!res.data.user) {
                    navigate('/login')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className='w-80 h-70 m-2 p-2 rounded-xl border-3 border-dashed shadow-xl/20 flex flex-col items-center justify-between gap-2 bg-zinc-500/50 backdrop-blur-sm' key={props.blogId}>
                <div className='w-75 h-33 bg-zinc-900 rounded-md bg-cover bg-center overflow-hidden'><img src={`data:${props.image.contentType};base64,${props.image.data}`} /></div>
                <div className='flex flex-col w-75 h-30 items-center justify-center'>
                    <h1 className='text-2xl font-bold text-center text-shadow-lg tracking-tighter'>{props.title}</h1>
                    <p className='mt-1 italic text-sm font-semibold text-center text-shadow-lg tracking-wider'>{props.email} </p>
                    <div className='w-75 flex gap-2 mt-3 p-2 justify-between'>
                        <button onClick={() => handlebloglike(props.blogId)} className=' bg-white px-3 py-1 rounded-md font-semibold border-2 shadow-xl/20 hover:bg-blue-600 transition-colors duration-300' ><img className='h-5 w-5' src={like} />{props.likes.length}</button>
                        <button onClick={() => handleblogview(props.blogId)} className='bg-white px-3 py-1 rounded-md font-semibold border-2 shadow-xl/20 hover:bg-green-600 transition-colors duration-300' ><img className='h-7 w-7' src={view} /></button>
                        <button onClick={() => handleblogdislike(props.blogId)} className='bg-white px-3 py-1 rounded-md font-semibold border-2 shadow-xl/20 hover:bg-red-600 transition-colors duration-300' ><img className='h-5 w-5' src={dislike} />{props.dislikes.length}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blogcard