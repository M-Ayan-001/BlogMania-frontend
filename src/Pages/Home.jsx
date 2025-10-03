import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Blogcard from '../components/Blogcard'
import Navbar from '../components/Navbar'

const API = import.meta.env.VITE_API_URL;

const Home = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get(`${API}/blog/allblogs`)
            .then((res) => {
                setBlogs(res.data.blogs)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <div className='w-full min-h-screen bg-white text-black'>
                <Navbar />
                <div className='w-full mt-25 flex flex-wrap'>

                    {
                        blogs.length === 0 ? (
                            <h1 className='text-2xl font-bold tracking-tighter w-full h-full text-center'>No Blogs Found</h1>
                        ) : (
                            blogs.map((blog) =>
                            (
                                <Blogcard blogId={blog._id} title={blog.title} image={blog.image} description={blog.description} email={blog.user.email} likes={blog.likes} dislikes={blog.dislikes} />
                            ))
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Home