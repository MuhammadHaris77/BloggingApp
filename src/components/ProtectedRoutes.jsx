import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebaseMethods'
import { useNavigate } from 'react-router-dom'

const ProtectedRoutes = ({component}) => {
 const [user,setUser] = useState(false)
   
 const navigate = useNavigate()
 useEffect(()=>{
       onAuthStateChanged(auth,(user)=>{
       if(user){
        setUser(true)
        return
       }
          navigate('/login')
       })
 },[])
    return (
        user ? component : <div className='text-center'> <span className="loading loading-spinner text-primary loading-lg h-80 " ></span></div>

  )
}

export default ProtectedRoutes
