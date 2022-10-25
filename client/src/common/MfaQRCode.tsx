import React, { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user'
import { api } from '../utils/api'

export const MfaQRCode = () => {
    const {user}= useContext(UserContext)
    const [qrCode,setQrCode] = useState('')

    const getQRCode= useCallback(  async ()=>{
    if(user){
        const response= await api.get('/mfa/qrcode')
            setQrCode(response.data)
        }
    },[user])

    useEffect(()=>{
        getQRCode()
    },[getQRCode])
    
    if(qrCode){
        return <img src={qrCode} alt='qrcode' />
    }
  return <></>
}
