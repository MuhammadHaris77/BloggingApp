import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, } from '../config/config';
import Alert from '../components/Alert';
import Error from '../components/Error';


const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
   const navigate = useNavigate()

    const SignUp = (event) => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                setSuccess(true)
              setTimeout(()=>{
                navigate('/login')
          
              },1000)
                console.log("user successfully signup", user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
                // ..
                console.log("error", errorMessage)
                console.log(error)
            });

        console.log(username.current.value)
        console.log(email.current.value)
        console.log(password.current.value)
    }



    return (
        <div className='m-auto'>
            {success ? <Alert alert='User Successfully Register! ' /> : error && <Error  alert={error}/>}
            <form onSubmit={SignUp} className='m-4 p-4 bg-base-700 text-center   rounded-lg  shadow-xl ' style={{ width: '70%', margin: ' 15px auto' }}  >
                <h1 className=" text-blue-700 m-2 text-center text-6xl ">Register</h1>

                <br />
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Username" ref={username} />
                </label>
                <br />
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" className="grow" ref={email} placeholder="Email" />
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
                    <input type="password" className="grow" placeholder='Password' ref={password} />
                </label>
                <br />
                <button className="btn text-lg bg-blue-700  text-white">Register</button>

                <p className='p-2'>Already Have an Account? <Link to={'/login'} className='text-blue-700 font-semibold' >Sign In</Link>  </p>

            </form>
        </div>
    )
}

export default Register