import React, { useReducer } from 'react'
import { loginReducerType } from '../../types/login'
import axios from 'axios'

const loginReducer:loginReducerType = (state,action)=>{
  switch(action.type){
    case 'SET':return {...state,...action.payload}
    default: return state
  }
}

const Login = () => {
  const [loginState,dispatch] = useReducer(loginReducer,{email:"",password:''})
  
  const handleSubmit = async ()=>{ 
    try {
      const response= await axios.post(`${process.env.REACT_APP_API_URL}/login`,{loginState},{withCredentials:true})
      console.log("RESPONSE",response)
    } catch (error) {
      console.error('something went wrong')
    }
  }

  const handleDashboard = async ()=>{ 
    try {
      const response= await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`,{withCredentials:true})
      console.log("RESPONSE",response)
    } catch (error) {
      console.error('something went wrong')
    }
  }
  
  return (
    <div>
      <input placeholder='Email' onChange={(e)=>{
        dispatch({type:'SET',payload:{email:e.target.value}})
      }} />
      <input placeholder='Password' onChange={(e)=>{
        dispatch({type:'SET',payload:{email:e.target.value}})
      }} />
      <button onClick={handleSubmit}>Submit</button>

      <button onClick={handleDashboard}>Test</button>
    </div>
  )
}
export default Login