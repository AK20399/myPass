import React, { Suspense } from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { ROUTES } from '../utils/routes'

// Pages
const Home = React.lazy(()=>import('./Home'))
const Login = React.lazy(()=>import('./login'))
const Signup = React.lazy(()=>import('./signup'))

const router = createBrowserRouter([
  {
     path: ROUTES.HOME,
    element: <Home/>,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login/>
  },
  {
    path:ROUTES.SIGNUP,
    element:<Signup/>
  }
])

const Routes = () => {
  return (
    <Suspense fallback='Loading'>
      <RouterProvider router={router}/>
    </Suspense>
  )
}
export default Routes