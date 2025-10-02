import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL;

const Protectedroute = ({ children }) => {

    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${API}/user/authenticate`, { withCredentials: true })
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if(loading){
        return <h1 className='text-2xl font-bold text-center'>Loading...</h1>
    } 
    return user ? children : <Navigate to="/login" />

}

export default Protectedroute