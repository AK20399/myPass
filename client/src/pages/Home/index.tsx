import React from 'react'
import {Link} from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

const Home = () => {
  return (
    <div>
        <Link to={ROUTES.LOGIN}>Login</Link>
        <Link to={ROUTES.SIGNUP}>Signup</Link>
    </div>
  )
}

export default Home