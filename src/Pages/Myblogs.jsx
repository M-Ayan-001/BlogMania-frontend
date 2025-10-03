import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../components/Navbar'
import Blogcard from '../components/Blogcard'

const API = import.meta.env.VITE_API_URL;

const Myblogs = () => {

    const { id } = useParams()

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${API}/blog/myblogs/${id}`, { withCredentials: true })
            .then((res) => {
                setBlogs(res.data.blogs)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <>
            <div className='w-full min-h-screen bg-white text-black'>
                <Navbar />
                {
                    loading ? (
                        <h1>Loading....</h1>
                    ) : (
                        <div className='w-full mt-25 flex flex-wrap'>
                            {
                                blogs.length === 0 ? (
                                    <h1 className='text-2xl font-bold tracking-tighter w-full text-center'>No Blogs Found</h1>
                                ) : (
                                    blogs.map((blog) =>
                                    (
                                        <Blogcard blogId={blog._id} title={blog.title} image={blog.image} description={blog.description} email={blog.user.email} likes={blog.likes} dislikes={blog.dislikes} />
                                    ))
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Myblogs