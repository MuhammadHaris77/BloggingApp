import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebaseMethods';
import { onAuthStateChanged, signOut } from 'firebase/auth';


const Navbar = () => {


 const navigate = useNavigate()
 const [userName,setUserName] = useState('')

 useEffect(()=>{
   onAuthStateChanged(auth,(user)=>{
     if(user){
    //  console.log(user)
        setUserName(auth.currentUser.email)
     }
   })
 },[])

 console.log(userName)

   const logOut=()=>{
    signOut(auth).then(() => {
        setUserName(null)
        navigate('/login')
        console.log("logout successfully")
      }).catch((error) => {
        // An error happened.
      });
      
   }   



  return (
<div>
<div className="navbar bg-[#0a2472] fixed "  style={{zIndex:1}}>
  <div className="navbar-start"  >
    <div className="dropdown text-white " >
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm  dropdown-content bg-[#0a2472] rounded-box z-[1] mt-3 w-52 p-2 shadow">
    <Link className='mx-4' to={'/'}>Home</Link> 
    <Link className='mx-4' to={'/dashboard'}>Dashboard</Link>
    <Link className='mx-4' to={'/profile'}>Profile</Link>
     </ul>
    </div>
    <a className="btn btn-ghost text-white text-xl">Blogging App</a>
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal  text-white">
    <Link className='mx-4' to={'/'}>Home</Link> 
    <Link className='mx-4' to={'/dashboard'}>Dashboard</Link>
    <Link className='mx-4' to={'/profile'}>Profile</Link>
 
    </ul>
  </div>
  <div className="navbar-end">
    <p className='px-3 text-white'>{userName}</p>
    <button className="btn" onClick={logOut} >Log Out</button>
  </div>
</div>
</div>
  )
}

export default Navbar