import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, loginUser } from '../config/firebaseMethods';
import Error from '../components/Error';
import Alert from '../components/Alert';
const Login = () => {

    const email = useRef();
    const password = useRef();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const logIn = (event) => {
        event.preventDefault()
        console.log(email.current.value)
        console.log(password.current.value)
        loginUser({
            email : email.current.value,
            password : password.current.value,
        }).then((res)=>{
           console.log(res)
           setSuccess(true)
           setTimeout(() => {
            navigate('/')
            
           }, 1000);
        }).catch((error)=>{
            console.log(error)
            const errorMessage = error.message;

            setError(errorMessage)

        })
        
    }

    return (
        <div className='m-auto'>
            {success ? <Alert alert='User Successfully Login! ' /> : error && <Error alert={error} />}
            <form onSubmit={logIn} className='m-4 p-4 bg-base-700 text-center  rounded-lg  shadow-xl ' style={{ width: '70%', margin: " 15px auto" }}  >
                <h1 className=" text-[#0a2472] m-2 text-center text-6xl ">Log In</h1>

                <br />
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
                    <input type="email" autoComplete='on' required className="grow" ref={email} placeholder="Email" />
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
                    <input type="password" autoComplete='on' required className="grow" placeholder='Password' ref={password} />
                </label>
                <br />
                <button className="btn text-lg bg-[#0a2472]  text-white">LogIn</button>
                <p className='p-2'>Don't Have an Account? <Link to={'/register'} className='text-[#0a2472] font-semibold' >Sign Up</Link>  </p>

            </form>
        </div>
    )
}

export default Login