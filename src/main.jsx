
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'

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
    element: <Profile/>,
    path:'/profile'
  },
  {
    element: <Dashboard/>,
    path:'/dashboard'
  }
]
}])


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
