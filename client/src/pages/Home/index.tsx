import React, { useEffect, useState } from 'react'

declare var google: any;

const Home = () => {
  const [googleToken,setGoogleToken] = useState('')
  
  const handleCredentialResponse=(response:any) =>{
    setGoogleToken(response)
  }
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
    },[])
      
    console.log({googleToken})
    
  return (
    <div>
      <div id="login-with-google"></div> 
    </div>
  )
}

export default Home