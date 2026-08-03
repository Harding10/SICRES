import { LoginResponse } from "../types/auth";


export async function login(
email:string,
password:string
):Promise<LoginResponse>{


const response = await fetch(
"http://localhost/api/login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

}

);


if(!response.ok){

throw new Error(
"Erreur de connexion"
);

}



return response.json();


}