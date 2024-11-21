import React, { useEffect, useRef, useState } from 'react'
import { auth, deleteDocument, getData, sendData, updateDocument } from '../config/firebaseMethods'
import { documentId, Timestamp } from 'firebase/firestore'
import Logo from '../image/profile.jpg'
const Dashboard = () => {

  const title = useRef()
  const description = useRef()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [deleteBlogId, setDeleteBlogId] = useState(null)
  const [updateBlogId, setupdateBlogId] = useState()
  const [showdeleteModal, setshowdeleteModal] = useState(true)
  const [showUpdateModal, setshowUpdateModal] = useState(true)


  useEffect(() => {
    getData('blog', auth.currentUser.uid)
    .then((res) => {
      res = res.map((item) => ({
        ...item,
        Timestamp: item.Timestamp.toDate() 
        
       }));
        console.log(res[0])
        setData(res);
         }).catch((err) => {
        console.log(err)
      })
  }
    , [])






  const publishBlog = (event) => {
    event.preventDefault();
    setLoading(true)
    sendData({
      title: title.current.value,
      description: description.current.value,
      uid: auth.currentUser.uid,
      Timestamp: Timestamp.fromDate(new Date())
    }, 'blog').then((res) => {
      console.log(res)
      data.push(
        {
          title: title.current.value,
          description: description.current.value,
          uid: auth.currentUser.uid,
          documentId: res
        }
      )
      console.log(data)
      title.current.value = ''
      description.current.value = ''


    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false)

    })
  }

  const updateTitle = useRef()
  const updateDescription = useRef()



  const updateBlog = (documentId) => {
    setLoading(true)
    console.log(documentId)
    console.log(updateTitle.current.value, updateDescription.current.value)
    updateDocument(
      {
        title: updateTitle.current.value,
        description: updateDescription.current.value
      }, documentId.documentId, 'blog'
    ).then((res) => {
      console.log(res)
      data.splice(updateBlogId.index, 1, {
        title: updateTitle.current.value,
        description: updateDescription.current.value
      })
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
      setshowUpdateModal(false)


    })


  }

  const deleteBlog = (documentId) => {
    // console.log("docid", documentId)
    deleteDocument(documentId.documentId, 'blog')
      .then((res) => {
        console.log(res)
        data.splice(deleteBlogId.index, 1)
        setData([...data]);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setshowdeleteModal(false)
      })

  }

  return (



    <div  >
        {loading &&  <div className='text-center'>
          <span className="loading loading-spinner m-auto text-white loading-lg text-center h-[100px] " ></span>
        </div>
         }

      <div className='grid justify-items-start bg-[#2b2d42]'>
        <h1 className=" text-white m-2 text-center rounded text-[white] text-4xl pl-3 mt-20 ">Dashboard</h1>
      </div>


      <div className='grid justify-items-center  mt-10'>

        <form onSubmit={publishBlog} className=' text-center  shadow-lg mx-3 p-5 w-5/6 bg-[#2b2d42]' >
        <h1 className=" text-white m-2 text-center rounded text-[white] text-4xl pl-3  ">POST BLOG</h1>
        <br />
        <br />
          <input type="text" required ref={title} placeholder="Title of your blog?" className="input input-bordered w-full max-w-xl" />
          <br />
          <br />
          <textarea ref={description} required className="textarea textarea-bordered w-full max-w-xl" placeholder="Whats in your mind?"></textarea>
          <br />
          <br />
          <button type='submit' className="btn btn-outline bg-[#ffff]  text-black"  >{loading ? <span className="loading loading-spinner text-white loading-lg  " ></span> : "Publish Blog"} </button>

        </form>
      </div>




      <div className='grid justify-items-center bg-[#0a2472]'>

        <div className='  text-center shadow-lg m-3 bg-body-600 p- w-5/6  '>
          <h1 className=" text-[#ffff] m-4 text-center text-4xl ">My Blogs</h1>

          {
            data && data.map((item, index) => {
              return (
                <div key={index} className='grid justify-items-center text-start bg-[0a2472]'>

                  <div className="card m-2 p-2  bg-[#2b2d42]  w-3/4 shadow-xl">
                    <div className="card-body ">
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img src={Logo} />
                        </div>
                      </div>
                      <h2 className="card-title text-white justify-start"> {item.title}</h2>
                      <p className="text-sm text-gray-400 justify-start">
                        Published on: {item.Timestamp.toString()}
                      </p>


                      <p className='text-base-content text-neutral-content justify-start'>{item.description}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-outline text-white" onClick={() => {
                          setupdateBlogId(
                            {
                              documentId: item.docid,
                              index: index
                            }
                          )
                          document.getElementById('my_modal_2').showModal()
                        }}   >Edit</button>
                        <button className="btn btn-outline text-white" onClick={() => {
                          setDeleteBlogId(
                            {
                              documentId: item.docid,
                              index: index
                            }
                          )
                          document.getElementById('my_modal_1').showModal()
                        }}>Delete</button>

                      </div>
                    </div>
                  </div>
                </div>
              )


            })
          }


        </div>


      </div>


      {showdeleteModal && <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are You Sure!</h3>
          <p className="py-4">You Want to Delete This Blog?</p>
          <div className="modal-action">
            <div method="dialog ">
              <button type='submit' onClick={() => deleteBlog(deleteBlogId)} className="btn btn-success m-2" >Yes</button>
              <button type='submit' className="btn btn-error m-2">No</button>
            </div>
          </div>
        </div>
      </dialog>
      }

      {showUpdateModal && <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className='   text-center' >
            <div >
              <input type="text" required ref={updateTitle} placeholder="Title of your blog?" className="input input-bordered w-full max-w-xl" />
              <br />
              <br />
              <textarea ref={updateDescription} required className="textarea textarea-bordered w-full max-w-xl" placeholder="Whats in your mind?"></textarea>
              <br />
              <br />
              <button onClick={() => updateBlog(updateBlogId)} className="btn btn-outline bg-[#0a2472]  text-white"  >{loading ? <span className="loading loading-spinner text-white loading-lg  " ></span> : "Update Blog"} </button>
            </div>
          </div>
        </div>

      </dialog >

      }
    </div >

  )
}

export default Dashboard

