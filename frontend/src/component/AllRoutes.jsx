import React from 'react'
import { Login } from '../page/Login'
import { AdminLogin } from '../page/AdminLogin'
import { Studentpanal } from '../page/Studentpanal'
import { Course } from '../page/Course'
import { Route, Routes } from "react-router-dom";
import { Signup } from '../page/Signup'    
import { NotFound } from '../page/NotFound'

export const AllRoutes = () => {
  return (
    <div>
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studentpanel" element={<Studentpanal />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path='eduhub/course' element={<Course/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
  
    </div>
  )
}
