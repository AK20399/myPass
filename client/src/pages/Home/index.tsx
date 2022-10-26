import { useEffect } from "react"
import { api } from "../../utils/api"

const Home = () => {
  
  useEffect(()=>{
    getDashboard()
  },[])
  
  const getDashboard = async () => {
    await api.get('/dashboard')
  }
  
  const handleLogout = async ()=>{
    await api.get('/logout')
  }
  
  return <div>Home
    <button onClick={handleLogout}>Logout</button>
  </div>
}

export default Home