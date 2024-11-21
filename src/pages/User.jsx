import React, { useEffect, useId, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db, getData } from '../config/firebaseMethods'
import { collection, documentId, getDocs, query, where } from 'firebase/firestore'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Logo from '../image/profile.jpg'
const User = () => {

  const [userName, setUserName] = useState('')
  const [userblogs, setuserblogs] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  // console.log(param.id)


  useEffect(() => {
    setLoading(true)
    getDataFromFirestore()
  }, [])
  async function getDataFromFirestore() {
    const dataArr = []
    try {
      const q = query(
        collection(db, 'users'),
        where("id", "==", id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataArr.push({ ...doc.data(), docid: documentId })
      });
      console.log(dataArr)
      setUserName([dataArr[0].username.toUpperCase()])
      const userblogs = await getData('blog', id)
      console.log(userblogs)
      setuserblogs(userblogs)
      console.log(userblogs)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
         <div className='grid justify-items-start bg-[#2b2d42]'>
        <h1 className=" text-blue-700 m-2 text-center text-white mt-20 text-4xl   "> <Link to='/' className='mx-5 ' ><ArrowCircleLeftIcon /></Link>  Back to All Blogs!</h1>

      </div>

      <div className='  m-auto py-5 w-3/4 shadow-xl'>
{  userName &&    <h1 className="  m-2  text-[#2b2d42]  text-center   text-4xl ">ALL BLOG FROM {userName}</h1>
}
        <div className=' grid justify-items-center'>

          {
            userblogs && userblogs.map((item, index) => {
              return (
                <div key={index} className='grid justify-items-center'>
                  <div className="card m-2 p-2  bg-[#2b2d42]  w-3/4 shadow-xl">
                    <div className="card-body ">
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img src={Logo} />
                        </div>
                      </div>
                      <h2 className="card-title text-white justify-start">{item.title}</h2>
                      <p className="text-sm text-gray-400 justify-start">
                        Published on: {item.Timestamp.toDate().toString()}
                      </p>


                      <p className='text-base-content text-neutral-content justify-start'>{item.description}</p>
                      <br />
                    </div>
                  </div>
                </div>

              )
            })
          }
        </div>


      </div>


        



    </div>
  )
}

export default User