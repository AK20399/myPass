import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MfaQRCode } from '../../common/MfaQRCode';
import { VerifyOtp } from '../../common/VerifyOtp';
import { UserContext } from '../../context/user';
import { GoogleDataType } from '../../types';
import { api } from '../../utils/api';
import { ROUTES } from '../../utils/routes';

declare var google: any;

 const Login = () => {
 const navigate = useNavigate()
    const{user, setUser}= useContext(UserContext)
  const [showQRCode,setShowQRCode] = useState(false)
  
  useEffect(()=>{
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("login-with-google"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleCredentialResponse = async(googleData:GoogleDataType) =>{
    try {
      const response= await api.post('/login',{token:googleData.credential})
      if(response.data){
        setUser(response.data)
        if(!response.data.mfaSecret){
          setShowQRCode(true)
        }
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    }
  }
 
  return (
    <div>
      <div id="login-with-google"></div> 
      {showQRCode && <MfaQRCode />}
      {user && <VerifyOtp callback={()=>{
        navigate(ROUTES.LOGIN)
      }} />}
    </div>
  )
}
export default Login