import React, { useEffect, useState } from 'react'
import { auth, getAllData } from '../config/firebaseMethods'
import { Link,useParams, useNavigate } from 'react-router-dom'

const Home = () => {

  const [dataAllBlog,setdataAllBlog] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
  getAllData('blog')
  .then((res)=>{
  //  console.log(res)
    setdataAllBlog(res)

  }).catch((err)=>{
  //  console.log(err)
  })
    
  },[])


const singleUser=(item)=>{

  if(!auth.currentUser){
   alert("User not Login ")
    return
  }
  navigate(`/user/${item.uid}`)

    console.log(item)

}





  return (
    <div>
      <div className='grid justify-items-start bg-[#2b2d42]'>
        <h1 className=" text-blue-700 m-2 text-center text-white  text-4xl   ">Good Morning Readers!</h1>
       </div>

      <div>
      {
        dataAllBlog && dataAllBlog.map((item,index)=>{
          return (
            <div key={index} className='grid justify-items-center'>
            <div className="card m-2 p-2  bg-[#2b2d42]  w-3/4 shadow-xl">
              <div className="card-body ">
                <h2 className="card-title text-white justify-start">{item.title}</h2>
                <p className='text-base-content text-neutral-content justify-start'>{item.description}</p>
                <br />
                <div className="card-actions ">
                  <button onClick={()=>singleUser(item)} className=" text-blue-700">Sell All BLogs From this User!</button>
           
                </div>
              </div>
            </div>
          </div>

          )
        })
      }  
      </div> 





    </div>
  )
}

export default Home