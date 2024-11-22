import React, { useRef,useState, } from 'react'
import {  updatePassword } from "firebase/auth";
import { auth } from '../config/firebaseMethods';
import { db, getData } from '../config/firebaseMethods'
//import { collection, documentId, getDocs, query, where } from 'firebase/firestore'
//import { useParams } from 'react-router-dom';

 

const Profile = () => {
  
  const [userName, setUserName] = useState('')
//  const { id } = useParams()
  // console.log(param.id)


const password1 = useRef()
const password2 = useRef()
  return (
    <div>
      <div className='grid justify-items-start bg-[#2b2d42]'>
        <h1 className=" text-blue-700 m-2 text-center text-white  mt-20  text-4xl" >User Profile</h1>
       </div>

      <div className='grid justify-items-center '>

        <div className='  text-center shadow-lg m-3 p- w-5/6 '>
          <div className="avatar">
            <div className="w-24 rounded-xl">
              <img src="https://static.thenounproject.com/png/363640-200.png" />
            </div>
          </div>
          <div className='grid justify-items-center m-8'>
            <div className="card m-2 p-2  bg-[#0a2472]  w-3/4 shadow-xl">
              <div className="card-body ">

                <br />
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd" />
                  </svg>
                  <input type="password" className="grow" placeholder='Enter New Password?' ref={password1}  />
                </label>

                <br />
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd" />
                  </svg>
                  <input type="password" className="grow" placeholder='Enter Repeat Password?' ref={password2} />
                </label>
                <div className="card-actions justify-center">
                  <button  className="btn  text-[#0a2472]">Update Password</button>
                </div>
              </div>
            </div>
          </div>


        </div>


      </div>

    </div>
  )
}

export default Profile