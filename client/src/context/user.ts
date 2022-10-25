import { createContext } from "react";
import { UserType } from "../types";

export const UserContext = createContext<{user?:UserType,setUser:React.Dispatch<React.SetStateAction<UserType|undefined>>}>({user:undefined,setUser:()=>{}})