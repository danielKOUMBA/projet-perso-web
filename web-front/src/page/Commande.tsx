import React, { useState } from "react"
import Header from "../Components/header"
import Footer from "../Components/footer"
import { TrashIcon} from "@heroicons/react/16/solid"
import { apiFetch } from "../api/api"





type Todo={
    id:string
    nom:string
    numero:string
    produits:string 
    prix_avancer:string
    prix_total:string
    status:string 
    date:string 
    type:string
}
export default function Commandes(){
    const[res,setRes]=useState<string>('')
    const[nom,setNom]=useState('')
    const[numero,setNumero]=useState('')
    const[produit,setProduit]=useState('')
    const[date,setDate]=useState('')
    const [loader,setloader]=useState<boolean>(false)
   
    const[type,setType]=useState('')
    const[prix_avancer,setPrix_avancer]=useState('')
    const[prix_total,setPrix_payer]=useState('')
    const [update,setUpdate]=useState<Todo|null>(null)
    const [error,setError]=useState<string>('')
   setTimeout(()=>setError(''),5000)

    const[allCommande,setAllcommande]=useState<Todo[]>([])
   

    setTimeout(()=>setRes(''),8000)
async function handleSubmit(e){
    e.preventDefault()
    try{
        const response= await apiFetch('/api/commande',{
            method:'POST',
            body:JSON.stringify({nom,numero,produit,date,type,prix_avancer,prix_total})
        })
        if (response.erreur){
            setError(response.erreur)
        }else{
            setRes(response.message)
            console.log(response.message)
        }
       
     
    }catch(err){
        console.log(err)
    }
}

async function AllCommande(){
    setloader(true)
    try{
        const data=await apiFetch('/api/allCommande',{
            method:'POST'
        })
        if (data.erreur){
            setError(data.erreur)
            console.log(data.erreur)
        }else{
            setAllcommande(data)
        }
            
        
    }catch(err){
        console.log(err)
    }
    setloader(false)
}

async function OnDelete(commande:Todo){
    try{
        const res=await apiFetch('/api/deleteCommande',{
            method:'POST',
            body:JSON.stringify({'id':commande.id})
        }) 
        setAllcommande(res)
    }catch(err){
        console.log(err)
    }
    

}

async function handleEdit(commandes:Todo,e){
   e.preventDefault()
    try{
        const data=await apiFetch('/api/updateCommande',{
            method:'PUT',
            body:JSON.stringify(commandes)
        })
        if (data.erreur){
            setError(data.erreur)
        }else{
            setUpdate(null)
        }
    }catch(err){
        console.log(err)
    }
}



    return( <>
        <Header/>
        
        {/* FORMULAIRE */}
        <div className="flex justify-center mt-24">
        <div className="bg-green-50 border border-green-200 rounded-xl shadow-lg p-6 w-[340px]">
        
        <form onSubmit={handleSubmit} className="space-y-3">
        
        <h1 className="font-bold text-lg text-green-900">
        Entrez vos nouvelles commandes
        </h1>
        
        <input
        type="text"
        placeholder="nom du client..."
        className="w-full p-2 border-b border-green-300 bg-transparent outline-none"
        onChange={(e)=>setNom(e.target.value)}
        required
        />
        
        <input
        type="number"
        placeholder="numero du client..."
        className="w-full p-2 border-b border-green-300 bg-transparent outline-none"
        onChange={(e)=>setNumero(e.target.value)}
        required
        />
        
        <input
        type="text"
        placeholder="produits commander..."
        className="w-full p-2 border-b border-green-300 bg-transparent outline-none"
        onChange={(e)=>setProduit(e.target.value)}
        required
        />
        
        <select
        value={type}
        onChange={(e)=>setType(e.target.value)}
        className="w-full p-2 border border-green-300 rounded-md bg-white"
        required
        >
        <option value="" disabled>Choisir un type de produit</option>
        <option value="tee shirt">tee shirt</option>
        <option value="Basket">Basket</option>
        <option value="chemise">chemise</option>
        <option value="Polos">Polos</option>
        <option value="Bijoux">Bijoux</option>
        <option value="Pantalon">Pantalon</option>
        </select>
        
        <input
        type="date"
        className="w-full p-2 border-b border-green-300 bg-transparent outline-none"
        onChange={(e)=>setDate(e.target.value)}
        required
        />
        
        <input
        type="number"
        placeholder="prix avancer..."
        className="w-full p-2 border-b border-green-300 bg-transparent outline-none"
        onChange={(e)=>setPrix_avancer(e.target.value)}
        required
        />
        
        <input
        type="number"
        placeholder="prix total..."
        className="w-full p-2 border-b border-green-300 bg-transparent outline-none"
        onChange={(e)=>setPrix_payer(e.target.value)}
        required
        />
        
        <button
        type="submit"
        className="w-full mt-3 bg-green-400 hover:bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md transition"
        >
        enregistrer
        </button>
        
        {res &&
        <div className="bg-white border border-green-200 rounded-lg p-3 flex items-center gap-3 text-sm">
        
        <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M16.5 8.31V9a7.5 7.5 0 1 1-4.447-6.855M16.5 3 9 10.508l-2.25-2.25" stroke="#22C55E"/>
        </svg>
        
        <div>
        <h3 className="text-slate-700 font-medium">Sauvegarde faites!</h3>
        <p className="text-slate-500">{res}</p>
        </div>
        
        </div>
        }
        
        </form>
        
        </div>
        </div>
        
        
        
        {/* MODAL EDIT */}
        {update &&
        <div className="flex justify-center mt-10">
        
        <div className="bg-white border border-green-200 rounded-xl shadow-xl p-6 w-[340px]">
        
        <form className="space-y-3">
        
        <p
        className="text-right cursor-pointer font-bold text-green-600"
        onClick={()=>setUpdate(null)}
        >
        X
        </p>
        
        <input className="w-full p-2 border-b border-green-300 outline-none"
        type="text"
        value={update.nom}
        onChange={(e)=>setUpdate({...update,nom:e.target.value})}
        />
        
        <input className="w-full p-2 border-b border-green-300 outline-none"
        type="number"
        value={update.numero}
        onChange={(e)=>setUpdate({...update,numero:e.target.value})}
        />
        
        <input className="w-full p-2 border-b border-green-300 outline-none"
        type="text"
        value={update.produits}
        onChange={(e)=>setUpdate({...update,produits:e.target.value})}
        />
        
        <input className="w-full p-2 border-b border-green-300 outline-none"
        type="text"
        value={update.prix_avancer}
        onChange={(e)=>setUpdate({...update,prix_avancer:e.target.value})}
        />
        
        <input className="w-full p-2 border-b border-green-300 outline-none"
        type="number"
        value={update.prix_total}
        onChange={(e)=>setUpdate({...update,prix_total:e.target.value})}
        />
        
        <input className="w-full p-2 border-b border-green-300 outline-none"
        type="date"
        value={update.date}
        onChange={(e)=>setUpdate({...update,date:e.target.value})}
        />
        
        <input className="w-full p-2 border-b border-green-300 outline-none"
        type="text"
        value={update.type}
        onChange={(e)=>setUpdate({...update,type:e.target.value})}
        />
        
        <button
        className="w-full bg-green-400 hover:bg-green-500 text-white py-2 rounded-lg shadow-md"
        onClick={(e)=>handleEdit(update,e)}
        >
        enregistrer
        </button>
        
        </form>
        
        </div>
        </div>
        }
        
        
        
        {/* BOUTON CHARGER */}
        <div className="flex justify-center mt-10">
        
        <button
        className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-lg shadow-md transition"
        onClick={AllCommande}
        >
        {loader ? "chargement..." : "voir toutes les commandes"}
        </button>
        
        </div>
        
        
        
        {/* ERREUR */}
        {error &&
        <div className="flex justify-center mt-6">
        
        <div className="flex items-center bg-red-100 text-red-600 px-4 py-2 rounded-lg shadow">
        
        <p className="text-sm">
        Oops! {error}
        </p>
        
        </div>
        
        </div>
        }
        
        
        
        {/* LISTE COMMANDES */}
        <div className="flex justify-center mt-10 mb-40">
        
        <ul className="space-y-4 w-[900px]">
        
        {allCommande.map((commande)=>(
        <div
        key={commande.id}
        className="bg-white border border-green-200 rounded-xl shadow-md p-4 flex flex-wrap gap-3 items-center"
        >
        
        <p className="font-semibold">Nom: <span className="font-normal">{commande.nom}</span></p>
        
        <p className="font-semibold">Numero: <span className="font-normal">{commande.numero}</span></p>
        
        <p className="font-semibold">type: <span className="font-normal">{commande.type}</span></p>
        
        <p className="font-semibold">produits: <span className="font-normal">{commande.produits}</span></p>
        
        <p className="font-semibold">prix avancer:
        <span className="font-normal">{commande.prix_avancer} fcfa</span>
        </p>
        
        <p className="font-semibold">prix total:
        <span className="font-normal">{commande.prix_total} fcfa</span>
        </p>
        
        <p className="font-semibold">statuts:
        <span className="font-normal">{commande.status}</span>
        </p>
        
        <p className="font-semibold">date:
        <span className="font-normal">{commande.date}</span>
        </p>
        
        <button onClick={()=>OnDelete(commande)}>
        <TrashIcon className="w-6 text-red-500"/>
        </button>
        
        <button
        className="bg-green-100 border border-green-300 px-3 py-1 rounded-md shadow-sm hover:bg-green-200"
        onClick={()=>setUpdate(commande)}
        >
        modifier
        </button>
        
        </div>
        ))}
        
        </ul>
        
        </div>
        
        <Footer/>
        
        </>
        )
        }
        