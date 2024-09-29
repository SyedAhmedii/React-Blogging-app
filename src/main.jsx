import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoutes from './components/ProtectedRoutes'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/sigup',
                element: <Signup />
            },
            {
                path: 'dashboard',
                element: <ProtectedRoutes component={<Dashboard />} />
            },
            {
                path: 'profile',
                element: <ProtectedRoutes component={<Profile />} />
            }
        ]
    },
])



createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>

)
