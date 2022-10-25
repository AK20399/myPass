import React, { Suspense, useState } from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { UserContext } from '../context/user'
import { UserType } from '../types'
import { ROUTES } from '../utils/routes'

// Pages
const Home = React.lazy(()=>import('./Home'))
const Login = React.lazy(()=>import('./Login'))

const router = createBrowserRouter([
  {
     path: ROUTES.HOME,
    element: <Home/>,
  },
  {
     path: ROUTES.LOGIN,
    element: <Login />,
  },
])


const Routes = () => {
  
  const [user,setUser] = useState<UserType|undefined>(undefined)

  return (
    <Suspense fallback='Loading'>
      <UserContext.Provider value={{user,setUser}}>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </Suspense>
  )
}
export default Routes