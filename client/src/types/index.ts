export type LoginStateType ={email:string,password:string}

export type LoginReducerType = (state:LoginStateType,action:{type:'SET',payload:Partial<LoginStateType>})=>LoginStateType

export interface UserType {
    username:string,
    email:string,
    profilePicture:string,
    googleToken:string,
    mfaSecret:string
}

export interface GoogleDataType {
    clientId:string,
    credential: string,
    select_by: string
}