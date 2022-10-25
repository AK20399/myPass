import React, { useContext, useState } from 'react'
import { UserContext } from '../context/user'
import { api } from '../utils/api'

type proptype ={
    callback:()=>void
}

export const VerifyOtp = ({callback}:proptype) => {
    const [code,setCode] = useState('')
    const{user}= useContext(UserContext)

    const verifyOtp = async ()=>{
    try {
      const response = await api.post('/mfa/verify',{email:user?.email,code})
      if(response.data){
        callback()
      }else{
        throw Error('Verification failed')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    }
  }
    
    if(!user){
        return <></>
    }
  return (
<>
        <input placeholder='Enter code' onChange={(e)=>setCode(e.target.value)} value={code} />
        <button onClick={verifyOtp}>Verify code</button>
      </>
  )
}
