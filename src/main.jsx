
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import User from './pages/User.jsx'

const router = createBrowserRouter([{
  element:<Layout/>,
  path:'/',
  children:[
    {
     element: <Register/>,
     path:'/register'
   },
   {
    element: <Login/>,
    path:'/login'
  },
  {
    element: <Home/>,
    path:'/'
  },
  {
    element: <ProtectedRoutes component={ <Profile/>} />,
    path:'/profile'
  },
  {
    element: <ProtectedRoutes component={<Dashboard/>} />,
    path:'/dashboard'
  },
  {
    element: <ProtectedRoutes component={<User/>} />,
    path:'user/:id'
  }
]
}])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
