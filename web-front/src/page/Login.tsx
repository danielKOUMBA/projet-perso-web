import React, { useState} from "react"
import logos from '../assets/logos.JPG'
import { apiFetch } from "../api/api"
import setToken from "../api/api"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../Components/footer"


export default function Login(){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
    const [loader,setloader]=useState<boolean>(false)
    const navigate=useNavigate()
   
    
  async function handleSubmit(e){
    setloader(true)
            e.preventDefault()
            try{
                const data = await apiFetch('/api/login',{
                    method:'POST',
                    body:JSON.stringify({email,password })
                })

                if (data.token){
                    setToken(data.token)
                    navigate('/accueil')
                }else{
                    setError(data.erreur)
                    console.log(data.erreur)
                }

            }catch(err){
                console.log('erreur fetch:',err)
            }
       setloader(false)
    }
    return(<>
  
   <div className="flex justify-center font-bold">
         < p className="color-black ">Connexion</p>
   </div>
   {error && <div className="bg-red-500 text-center p-2 w-1/2 flex justify-center mx-auto rounded-lg">
      {error}
    </div>}
    <div className="flex justify-center items-center p-4 pb-40">
        <form onSubmit={handleSubmit} className=" rounded-lg p-2">
            <input type="email" 
            placeholder="Email" 
            value={email}
            className="mt-1 mb-5 block w-full border border-gray-700 rounded-lg px-3 py-2  focus:outline-none bg-black text-white"
             required onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" 
            placeholder="mot de passe" 
            value={password}
            className="mt-1 mb-5 block w-full border border-gray-700 rounded-md px-3 py-2  focus:outline-none  bg-black text-white" 
            required onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" className="mt-1 block bg-black text-white rounded-lg border-b  p-2 cursor-pointer" >{loader? 'connexion...':'se connecter'}</button>
            <Link to='/register' className="text-green-bold hover:underline">modifier mon mot de passe?</Link>
        </form>
    </div>
    <Footer/>
    </>)
}