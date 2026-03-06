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



    return(<>
    <Header/>
     <div className="flex justify-center">
        <div className="absolute top-20 mx-3 border border-black rounded-lg p-5">
            <form onSubmit={handleSubmit}>
                    <h1  className="mb-4 font-bold">
                        Entrez vos nouvelles commandes
                    </h1>
                    <input type="text" placeholder="nom du client..."  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setNom(e.target.value)} required/>
                    <input type="number" placeholder="numero du client..."  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setNumero(e.target.value)} required/>
                    <input type="text" placeholder="produits commander..."  className="mt-1 block p-1 border-b border-black "  onChange={(e)=>setProduit(e.target.value)} required/>
                    <select value={type} onChange={(e)=>setType(e.target.value)} required>
                        <option value="" disabled selected>Choisir un type de produits</option>
                        <option value="tee shirt">tee shirt</option>
                        <option value="Basket">Basket</option>
                        <option value="chemise">chemise</option>
                        <option value="Polos">Polos</option>
                        <option value="Bijoux">Bijoux</option>
                        <option value="Pantalon">Pantalon</option>
                    </select>
                    <input type="date"  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setDate(e.target.value)} required/>
                    <input type="number" placeholder="prix avancer..."  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setPrix_avancer(e.target.value)}required/>
                    <input type="number" placeholder="prix total..."  className="mt-1 block p-1 border-b border-black " onChange={(e)=>setPrix_payer(e.target.value)}required/>
                    <button type="submit" className="mt-2 border border-green-900 bg-green-100 text-black rounded-lg p-1 cursor-pointer shadow-lg">enregistrer</button>
                    {res && <div className="bg-white inline-flex space-x-3 p-3 text-sm rounded border border-gray-200">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 8.31V9a7.5 7.5 0 1 1-4.447-6.855M16.5 3 9 10.508l-2.25-2.25" stroke="#22C55E"  />
    </svg>
    <div>
        <h3 className="text-slate-700 font-medium">Sauvegarde faites!</h3>
        <p className="text-slate-500">{res}.</p>
    </div>
    <button type="button" aria-label="close" className="cursor-pointer mb-auto text-slate-400 hover:text-slate-600 active:scale-95 transition">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="currentColor" />
            <rect x="12.531" y="13.914" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.531 13.914)" fill="currentColor" />
        </svg>
    </button>
</div>}
            </form>       
        </div>
     </div>
     {update&&
     <div className="flex justify-center ">
      <div className="absolute top-110 z-1 bg-white p-5 mx-3 flex flex-wrap justify-center border border-black rounded-lg m-2">
        <form>
            <p className="font-bold absolute right-2 top-0 w-2" onClick={()=>setUpdate(null)}>X</p>
            <input  className="mt-1 block p-1 border-b border-green " type="text" value={update.nom} onChange={(e)=>setUpdate({...update,nom:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-green " type="number" value={update.numero}  onChange={(e)=>setUpdate({...update,numero:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-green " type="text" value={update.produits} onChange={(e)=>setUpdate({...update,produits:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-green "  type="text" value={update.prix_avancer} onChange={(e)=>setUpdate({...update,prix_avancer:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-green "  type="number" value={update.prix_total} onChange={(e)=>setUpdate({...update,prix_total:e.target.value})}/>
            <input  className="mt-1 block p-1 border-b border-green " type="date" value={update.date} onChange={(e)=>setUpdate({...update,date:e.target.value})} />
            <input  className="mt-1 block p-1 border-b border-green " type="text" value={update.type} onChange={(e)=>setUpdate({...update,type:e.target.value})} />
            <button className="mt-2 border border-green-900 bg-green-100 text-black rounded-lg p-1 cursor-pointer shadow-lg" onClick={(e)=>handleEdit(update,e)}>enregistrer</button>
           
        </form>
      </div>
    </div>
    }
     
    <div className="flex justify-center">
        <div className="absolute top-130 pb-50 flex items-center gap-3">
            <button className="border border-green-900 bg-green-100 p-2 rounded-lg cursor-pointer shadow-lg" onClick={AllCommande}>{loader? 'chargement...':'voir toutes les commandes'}</button>

        </div>
    </div>
    {error && <div className=" absolute top-115 left-1/4 flex items-center justify-between max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded">
    <div className="flex items-center ">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14.167q.354 0 .593-.24.24-.24.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.593q0 .354.24.594t.593.24m-.834-3.334h1.667v-5H9.166zm.833 7.5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.645-1.781 8.4 8.4 0 0 1-1.782-2.646A8.1 8.1 0 0 1 1.666 10q0-1.73.656-3.25a8.4 8.4 0 0 1 1.782-2.646 8.4 8.4 0 0 1 2.645-1.781A8.1 8.1 0 0 1 10 1.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .657 3.25 8.1 8.1 0 0 1-.657 3.25 8.4 8.4 0 0 1-1.78 2.646 8.4 8.4 0 0 1-2.647 1.781 8.1 8.1 0 0 1-3.25.656" fill="currentColor"/>
        </svg>
        <p className="text-sm ml-2">Oops! {error} </p>
    </div>   
    <button type="button" aria-label="close" className="active:scale-90 transition-all ml-2 cursor-pointer text-red-500 hover:text-red-700">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5 5 15M5 5l10 10" stroke="currentColor" />
        </svg>
    </button>
</div> }
    <div className="absolute top-160 pb-30 flex justify-center">
        <ul className="space-y-4">
            <li>
                {allCommande.map((commande)=>(
                    <div key={commande.id} className="mt-1 border border-black m-2 p-2 rounded-lg  flex items-center gap-2">
                        <p className="font-bold">Nom: <span className="text-black">{commande.nom}</span></p>
                        <p className="font-bold">Numero: <span className="text-black">{commande.numero}</span></p>
                        <p className="font-bold">type: <span className="text-black">{commande.type}</span></p>
                        <p className="font-bold">produits: <span className="text-black">{commande.produits}</span></p>
                        <p className="font-bold">prix avancer: <span className="text-black">{commande.prix_avancer} fcfa</span></p>
                        <p className="font-bold">prix de l'article: <span className="text-black">{commande.prix_total} fcfa</span></p>
                        <p className="font-bold">statuts: <span className="text-black">{commande.status}</span></p>
                        <p className="font-bold">date: <span className="text-black">{commande.date}</span></p>
                        <button onClick={()=>OnDelete(commande)}>
                            <TrashIcon className="w-6" color="red"/>
                        </button>  
                        <button className="bg-green-100 p-1 border border-black rounded-lg shadow-lg" onClick={()=>setUpdate(commande)}>
                            modifier
                        </button>
                    </div>
                ))}
            </li>
        </ul>
    </div>
    
     
    <Footer/>
    </>)
}