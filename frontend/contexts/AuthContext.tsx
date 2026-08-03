"use client";

import {
createContext,
useContext,
useState,
ReactNode
} from "react";

import {User} from "@/features/auth/types/auth";



interface AuthContextType {

user: User | null;

setUser:(user:User|null)=>void;

}



const AuthContext=createContext<AuthContextType | undefined>(undefined);



export function AuthProvider({
children
}:{
children:ReactNode
}){


const [user,setUser]=useState<User|null>(null);



return(

<AuthContext.Provider
value={{
user,
setUser
}}
>

{children}

</AuthContext.Provider>

);


}




export function useAuth(){


const context=useContext(AuthContext);


if(!context){

throw new Error(
"useAuth doit être utilisé dans AuthProvider"
);

}


return context;


}