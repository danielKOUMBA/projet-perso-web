import Footer from "../Components/footer";
import React, { useState } from "react";
import Header from "../Components/header";
import {TrashIcon} from "@heroicons/react/16/solid";
import { apiFetch } from "../api/api";

type Cout={
    id:number
    nom:string 
    date:string 
    prix:number
}


export default function Cout(){
      const[depense,setDepense]=useState('')
      const[date,setDate]=useState('')
      const [loader,setloader]=useState<boolean>(false)
      const[somme,setSomme]=useState('')
      const[res,setRes]=useState('')
      const [error,setError]=useState('')
      const[allcout,setAllcout]=useState<Cout[]>([])
      setTimeout(()=>setRes(''),4000)
      setTimeout(()=>setError(''),4000)
    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response=await apiFetch('/api/cout',{
                method:'POST',
                body:JSON.stringify({depense,date,somme})
            })
            if (response.erreur){
                setError(response.erreur)
            }else{
                setRes(response)
            }
            
            setDate('')
            setDepense('')
            setSomme('')
        }catch(err){
            console.log(err)
        }
    }

    async function allCout(){
        setloader(true)
        try{
            const data=await apiFetch('/api/allCout',{
                method:'POST'
            })
            if (data.erreur){
                setError(data.erreur)
            }else{
                setAllcout(data)
            }
          
        }catch(err){
            console.log(err)
        }
        setloader(false)
    }

    async function OnDelete(cout:Cout){
        try{
            const res=await apiFetch('/api/deleteCout',{
                method:'POST',
                body:JSON.stringify({'id':cout.id})
            })
            setAllcout(res)
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    return(<>
    <Header/>
      <div className="flex justify-center">
        <div className="absolute top-1/4 mx-3 border border-black rounded-lg p-5">
                <form onSubmit={handleSubmit}>
                    <h1 className="mb-4 font-bold">Enregistrez une recente depense</h1>
                           
                            <select value={depense} onChange={(e)=>setDepense(e.target.value)} required>
                            <option value="" disabled selected>Choisir un type cout</option>
                            <option value="Conception">Conception</option>
                            <option value="Salaire">Salaire</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Transport et Livraison">Transport et Livraison</option>
                            <option value="Autres">Autres</option>
                         </select>
                        <input type="date" placeholder="date du jour..." className="mt-1 block p-1 border-b border-black " value={date}  onChange={(e)=>setDate(e.target.value)} required />
                        <input type="number" placeholder="somme de la depense..." className="mt-1 block p-1 border-b border-black " value={somme}  onChange={(e)=>setSomme(e.target.value)} required/>
                        <button type="submit" className="mt-2 border border-green-900 bg-green-100 text-black rounded-lg p-1 cursor-pointer">enregistrer</button>
                        {res&& <div className="mt-1 bg-green-500 p-1 rounded-lg">{res}</div>}
                </form> 
            </div>
        </div> 
        
         <div className="flex justify-center">
            <div className="absolute top-120 flex gap-3">
                    <button className="border border-green-900 bg-green-100 p-2 rounded-lg cursor-pointer" onClick={allCout}><p>
                    {loader? 'chargement...':'voir toutes les depenses'} 
                            </p>
                        </button>
                  
                   
                </div>
         </div>
         {error &&  <div className=" absolute top-105 left-1/4  flex items-center justify-between max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded">
    <div className="flex items-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14.167q.354 0 .593-.24.24-.24.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.593q0 .354.24.594t.593.24m-.834-3.334h1.667v-5H9.166zm.833 7.5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.645-1.781 8.4 8.4 0 0 1-1.782-2.646A8.1 8.1 0 0 1 1.666 10q0-1.73.656-3.25a8.4 8.4 0 0 1 1.782-2.646 8.4 8.4 0 0 1 2.645-1.781A8.1 8.1 0 0 1 10 1.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .657 3.25 8.1 8.1 0 0 1-.657 3.25 8.4 8.4 0 0 1-1.78 2.646 8.4 8.4 0 0 1-2.647 1.781 8.1 8.1 0 0 1-3.25.656" fill="currentColor"/>
        </svg>
        <p className="text-sm ml-2">Oops! {error}</p>
    </div>   
    <button type="button" aria-label="close" className="active:scale-90 transition-all ml-2 cursor-pointer text-red-500 hover:text-red-700">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5 5 15M5 5l10 10" stroke="currentColor"/>
        </svg>
    </button>
</div>}

            <div className="absolute top-150 pb-30 w-full flex justify-center">
                <ul>
                    <li>
                        {allcout.map((cout)=>(
                            <div key={cout.id} className="p-2 m-2 border border-black rounded-lg flex justify-between items-center gap-3">
                               
                                <p className="font-bold">Depense : {cout.nom}</p>
                                <p className="font-bold ">Somme : {cout.prix}fcfa</p>
                                <p className="font-bold">Date : {cout.date}</p>
                                <button onClick={()=>OnDelete(cout)}>
                                    <TrashIcon className="w-5" color="red"/>
                                </button>
                            </div>
                        ))}
                    </li>
                </ul>
            </div>
      
        
    <Footer/>
    </>)
}