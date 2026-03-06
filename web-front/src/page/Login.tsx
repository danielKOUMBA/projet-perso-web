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
    
  
    return(
        <>
        <div className="min-h-screen flex flex-col justify-between bg-green-50">
        
        {/* CONTENU */}
        <div className="flex flex-col items-center justify-center flex-grow">
        
       
        
        <h1 className="text-2xl font-bold text-green-700 mb-6">
        Connexion
        </h1>
        
        {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 shadow">
        {error}
        </div>
        )}
        
        <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-80 border border-green-100"
        >
        
        <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-green-500"
        />
        
        <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        required
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-5 focus:outline-none focus:border-green-500"
        />
        
        <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
        >
        {loader ? "Connexion..." : "Se connecter"}
        </button>
        
        <Link
        to="/register"
        className="block text-center text-green-700 mt-4 hover:underline"
        >
        Modifier mon mot de passe ?
        </Link>
        
        </form>
        
        </div>
        
        <Footer/>
        
        </div>
        </>
        )
        }
        
