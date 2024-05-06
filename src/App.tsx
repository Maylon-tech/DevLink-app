import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/home"
import Login from "./pages/login"
import Adimin from "./pages/admin"
import NetWorks from "./pages/networks"

import Private from './routes/Private'
import ErrorPage from "./error"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <Private> <Adimin /> </Private>
  },
  {
    path: '/admin/social',
    element: <Private> <NetWorks /> </Private>
  },
  {
    path: "*",
    element: <ErrorPage />
  }
  
])

export default router