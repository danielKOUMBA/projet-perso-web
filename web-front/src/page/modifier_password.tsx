import React, { useState } from "react"
import  logos  from '../assets/logos.JPG'
import setToken, { apiFetch } from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Modifier_password(){
    const navigate=useNavigate()
    const[erreur, setErreur]=useState('')
    const [email,setEmail]=useState('')
    const [OldPassword,setOldPassword]=useState('')
    const [NewPassword,setNewPassword]=useState('')
    async function handleSubmit(e){
          e.preventDefault()
          try{
            const data=await apiFetch('/api/update_password',{
                method:'POST',
                body:JSON.stringify({email,OldPassword,NewPassword})
            })
            
            if (data.token){
                setToken(data.token)
                navigate('/accueil')
            }else{
               setErreur(data)
               console.log(data)
            }
          }catch(err){
            console.log(err)
          }
    }
    return(<>
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-2">
                <h1 className="font-bold">the view optique vision</h1>
                <img src={logos} alt="logos du site" className="w-14 rounded-lg"/>
            </div>
          {erreur && <div className="w-1/3 bg-red-500 rounded-lg mx-auto p-1 ">
                {erreur}
            </div>}
            <div className=" w-1/3  mx-auto p-4">
                <input type="email" placeholder="email..." className="mt-1 block border-b border-black p-1 text-black "required onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="ancien mot de passe..." className="mt-1 block border-b border-black p-1 text-black" required onChange={(e)=>setOldPassword(e.target.value)}/>
                <input type="password" placeholder="nouveau mot de passe..." className="mt-1 block border-b border-black p-1 text-black" required onChange={(e)=>setNewPassword(e.target.value)}/>
                <button type="submit" className="mt-1 p-1 rounded-lg bg-green-500 border border-black">modifier</button>
            </div>
        </form>
        
    </>)
}