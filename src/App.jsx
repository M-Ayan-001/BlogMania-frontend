import React from 'react'
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Protectedroute from './components/Protectedroute.jsx'

import Home from './Pages/Home.jsx'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import Createblog from './Pages/Createblog.jsx'
import Normalview from './Pages/Normalview.jsx'
import Myblogs from './Pages/Myblogs.jsx'
import Specialview from './Pages/Specialview.jsx'
import MyLikedblogs from './Pages/MyLikedblogs.jsx'
import MyDislikedblogs from './Pages/MyDislikedblogs';


const App = () => {

  const pageRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/blogcreation',
      element: (
        <Protectedroute>
          <Createblog />
        </Protectedroute>
      )
    },
    {
      path: '/normal/:id',
      element: <Normalview />
    },
    {
      path: '/myblogs/:id',
      element: (
        <Protectedroute>
          <Myblogs />
        </Protectedroute>
      )
    },
    {
      path: '/myblogs/',
      element: <Login />
    },
    {
      path: '/special/:id',
      element: <Specialview />
    },
    {
      path: '/mylikedblogs/',
      element: <Login />
    },
    {
      path: '/mylikedblogs/:id',
      element: (
        <Protectedroute>
          <MyLikedblogs />
        </Protectedroute>
      )
    },
    {
      path: '/mydislikedblogs/',
      element: <Login />
    },
    {
      path: '/mydislikedblogs/:id',
      element: (
        <Protectedroute>
          <MyDislikedblogs />
        </Protectedroute>
      )
    }
  ])

  return (
    <>
      <RouterProvider router={pageRouter} />
    </>
  )
}

export default App