export type loginStateType ={email:string,password:string}

export type loginReducerType = (state:loginStateType,action:{type:'SET',payload:Partial<loginStateType>})=>loginStateType