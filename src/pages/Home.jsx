import React, { useEffect, useState } from 'react'
import { auth, getAllData } from '../config/firebaseMethods'
import { Link,useParams, useNavigate } from 'react-router-dom'
import Logo from '../image/profile.jpg'
import { format } from "date-fns";
import { Timestamp } from 'firebase/firestore';

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [dataAllBlog,setdataAllBlog] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    setLoading(true)
    getAllData('blog')
    .then((res) => {
      res = res.map((item) => ({
        ...item,
        Timestamp :item?.Timestamp?.toDate() }
      ));
        setdataAllBlog(res);
       
    })
   .catch((err) => {
        console.error(err);
      }).finally(() => {
        setLoading(false)
  
      });
  }, []);
  
console.log(dataAllBlog[0])

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
        <h1 className=" text-blue-700 m-2 text-center text-white mt-20  text-4xl" >Good Morning Readers!</h1>
       </div>

      <div>
        {loading &&  <div className='text-center'>
          <span className="loading loading-spinner m-auto text-black loading-lg text-center h-[100px] " ></span>
        </div>
         }
      {
        dataAllBlog && dataAllBlog.map((item,index)=>{
          return (
            <div key={index} className='grid justify-items-center bg-[#ffff]'>
            <div className="card m-2 p-2  bg-[#0a2472]  w-3/4 shadow-xl" >
              <div className="card-body ">
              <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img src={Logo} />
                        </div>
                      </div>
            
                <h2 className="card-title text-white justify-start">{item.title}</h2>
                <p className="text-sm text-gray-400 justify-start">
                Published on: {item.Timestamp?.toString()}
                 </p>
        
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