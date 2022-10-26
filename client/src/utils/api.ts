import axios from "axios";

export const api ={
    get:(url:string)=>axios.get(`${process.env.REACT_APP_API_URL}${url}`,{withCredentials:true}),
    post:(url:string,data:any)=>axios.post(`${process.env.REACT_APP_API_URL}${url}`,data,{withCredentials:true})
}