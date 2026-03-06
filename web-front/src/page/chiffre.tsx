import React, { useState } from "react"
import Header from "../Components/header"
import Footer from "../Components/footer"
import { apiFetch } from "../api/api"
import { FaDollarSign } from "react-icons/fa"

export default function Chiffres(){
    const [dateTo,setDateTo]=useState('')
    const [dateFrom,setDateFrom]=useState('')
    const [dateTo2,setDateTo2]=useState('')
    const [dateFrom2,setDateFrom2]=useState('')
    const [dateTo3,setDateTo3]=useState('')
    const [dateFrom3,setDateFrom3]=useState('')
    const [somme,setSomme]=useState(null)
    const [depense,setDepense]=useState(null)
    const [tresor,setTresor]=useState(null)
    const [msg,setmsg]=useState('')

    const [msg2,setmsg2]=useState('')
    const [msg3,setmsg3]=useState('')
    const [loader,setLoader]=useState<boolean>(false)
    const [loader2,setLoader2]=useState<boolean>(false)
    const [loader3,setLoader3]=useState<boolean>(false)

    const [s,setS]=useState(null)
    const [o,setO]=useState(null)
    const [ph,setPh]=useState(null)
    const [pr,setPr]=useState(null)
    const [a,setA]=useState(null)
    const [pe,setPe]=useState(null)
    
    const [c,setC]=useState(null)
    const [s2,setS2]=useState(null)
    const [m,setM]=useState(null)
    const[t,setT]=useState(null)
    const [a2,setA2]=useState(null)

    const handleSubmit= async(e)=>{
        
        e.preventDefault()
        setLoader(true)
        try{
            const response =  await apiFetch('/api/chiffre_commande',{
                method:'POST',
                body:JSON.stringify({dateTo,dateFrom})
            })
         if (response.message){
            setmsg(response.message)
         }
         setSomme(response.data)
         setS(response.solaire)
         setA(response.accessoire)
         setO(response.optique)
         setPe(response.percee)
         setPh(response.photochromique)
         setPr(response.progressive)

        }catch(err){
            console.log(err)
        }
        setLoader(false)
    }
    const handleSubmit2 = async (e) =>{
        e.preventDefault()
        setLoader2(true)
        try{
            const data=await apiFetch('/api/chiffre_depense',{
                method:'POST',
                body:JSON.stringify({dateFrom2,dateTo2})
            })
            if(data.message){
                setmsg2(data.message)
            }
            setDepense(data.data)
            setC(data.conception)
            setS2(data.salaire)
            setM(data.marketing)
            setT(data.TL)
            setA2(data.autre)
        }catch(err){
            console.log(err)
        }
        setLoader2(false)
    }
    const handleSubmit3= async (e) => {
        setLoader3(true)
        e.preventDefault()
        try{
            const res= await apiFetch('/api/tresor_trie',{
                method:'POST',
                body:JSON.stringify({dateFrom3,dateTo3})
            })
            if (res.message){
                setmsg3(res.message)
            }
            setTresor(res.data)
        }catch(err){
            console.log(err)
        }
        setLoader3(false)
    }
    return(
    <>
        <Header/>
        <div className="flex justify-center items-center ">
            <div className="absolute top-16 m-2">
                <p className="text-grey-500/80">statistique sur une periode (commandes)</p>
            </div>
            <div  className="absolute top-30 m-2" >
                <form onSubmit={handleSubmit}>
                    <label>
                          <p>Date de debut</p>
                         <input value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)} type="date" className="mb-5 mt-2 border border-grey-500 rounded-lg p-2 text-black " required/>
                    </label>
                    
                    <label>
                          <p>Date de fin</p>
                         <input value={dateTo} onChange={(e)=>setDateTo(e.target.value)} type="date"  className=" block mb-5 mt-2 border border-grey-500 rounded-lg p-2 text-black " required/>
                    </label>
                    <button type="submit" className={`hover:cursor-pointer bg-blue-100 p-1 px-6 border border-black rounded-lg shadow-lg mb-2 ${dateFrom && dateTo ? 'opacity-100':'opacity-30'}`} disabled={!dateFrom && !dateTo}>{loader ? 'chargement...':'Afficher'}</button>
                    {
                        dateTo && dateFrom &&  <p className="mb-2">Somme total entre le {dateTo} et {dateFrom} est : {somme ? somme + 'fcfa': ''} </p>
                    }
                  { somme && dateFrom && dateTo &&
                  <div>
                    <p className="mb-2 underline">statistique par produits</p>
                    <p>Solaire : {s} fcfa</p>
                    <p>Optique: {o} fcfa</p>
                    <p>Progressive: {pr} fcfa</p>
                    <p>Photochromique: {ph} fcfa</p>
                    <p>Percee : {pe} fcfa</p>
                    <p>Accessoire: {a} fcfa</p>
                  </div>
                    }
                   
                </form>
                {msg && <div className="flex items-center justify-between max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded">
    <div className="flex items-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14.167q.354 0 .593-.24.24-.24.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.593q0 .354.24.594t.593.24m-.834-3.334h1.667v-5H9.166zm.833 7.5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.645-1.781 8.4 8.4 0 0 1-1.782-2.646A8.1 8.1 0 0 1 1.666 10q0-1.73.656-3.25a8.4 8.4 0 0 1 1.782-2.646 8.4 8.4 0 0 1 2.645-1.781A8.1 8.1 0 0 1 10 1.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .657 3.25 8.1 8.1 0 0 1-.657 3.25 8.4 8.4 0 0 1-1.78 2.646 8.4 8.4 0 0 1-2.647 1.781 8.1 8.1 0 0 1-3.25.656" fill="currentColor"/>
        </svg>
        <p className="text-sm ml-2">Oops! {msg}</p>
    </div>   
    <button type="button" aria-label="close" className="active:scale-90 transition-all ml-2 cursor-pointer text-red-500 hover:text-red-700">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5 5 15M5 5l10 10" stroke="currentColor" />
        </svg>
    </button>
</div>}
            </div> 
        </div>
         <div className="flex justify-center items-center">
            <div className="absolute top-6/7 pb-30 m-2">
                <p>statistique sur une periode donnee (depense)</p>
                <div>
                <form onSubmit={handleSubmit2}>
                <label>
                          <p>Date de debut</p>
                         <input value={dateFrom2} onChange={(e)=>setDateFrom2(e.target.value)} type="date" className="mb-5 mt-2 border border-grey-500 rounded-lg p-2 text-black " required/>
                    </label>
                    
                    <label>
                          <p>Date de fin</p>
                         <input value={dateTo2} onChange={(e)=>setDateTo2(e.target.value)} type="date"  className=" block mb-5 mt-2 border border-grey-500 rounded-lg p-2 text-black " required/>
                    </label>
                    <button type="submit" className={`hover:cursor-pointer bg-blue-100 p-1 px-6 border border-black rounded-lg shadow-lg mb-2 ${dateFrom2 && dateTo2 ? 'opacity-100':'opacity-30'}`} disabled={!dateFrom2 && !dateTo2}>{loader2 ? 'chargement...':'Afficher'}</button>
                    {
                        dateTo2 && dateFrom2 &&  <p className="mb-2">Somme total entre le {dateTo2} et {dateFrom2} est : {depense ? depense + 'fcfa': ''} </p>
                    }
                </form>
                {msg2 && <div className="flex items-center justify-between max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded">
    <div className="flex items-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14.167q.354 0 .593-.24.24-.24.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.593q0 .354.24.594t.593.24m-.834-3.334h1.667v-5H9.166zm.833 7.5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.645-1.781 8.4 8.4 0 0 1-1.782-2.646A8.1 8.1 0 0 1 1.666 10q0-1.73.656-3.25a8.4 8.4 0 0 1 1.782-2.646 8.4 8.4 0 0 1 2.645-1.781A8.1 8.1 0 0 1 10 1.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .657 3.25 8.1 8.1 0 0 1-.657 3.25 8.4 8.4 0 0 1-1.78 2.646 8.4 8.4 0 0 1-2.647 1.781 8.1 8.1 0 0 1-3.25.656" fill="currentColor"/>
        </svg>
        <p className="text-sm ml-2">Oops! {msg2}</p>
    </div>   
    <button type="button" aria-label="close" className="active:scale-90 transition-all ml-2 cursor-pointer text-red-500 hover:text-red-700">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5 5 15M5 5l10 10" stroke="currentColor" />
        </svg>
    </button>
</div>}

             { depense && dateFrom2 && dateTo2 &&
                  <div>
                    <p className="mb-2 underline">statistique par type de depense</p>
                    <p>Conception : {c} fcfa</p>
                    <p>Salaire: {s2} fcfa</p>
                    <p>Marketing: {m} fcfa</p>
                    <p>Transport et Livraison: {t} fcfa</p>
                    <p>Autres : {a2} fcfa</p>
                  
                  </div>
                    }
            </div>
            </div>
           
        </div>

        <div className="flex justify-center items-center">
            <div className="absolute top-7/4  pb-30 m-2">
                  <p>Benefice de l'entreprise entre deux periode<FaDollarSign size={20}/></p>
                  
                <form onSubmit={handleSubmit3}>
                <label>
                          <p>Date de debut</p>
                         <input value={dateFrom3} onChange={(e)=>setDateFrom3(e.target.value)} type="date" className="mb-5 mt-2 border border-grey-500 rounded-lg p-2 text-black " required/>
                    </label>
                    
                    <label>
                          <p>Date de fin</p>
                         <input value={dateTo3} onChange={(e)=>setDateTo3(e.target.value)} type="date"  className=" block mb-5 mt-2 border border-grey-500 rounded-lg p-2 text-black " required/>
                    </label>
                    <button type="submit" className={`hover:cursor-pointer bg-blue-100 p-1 px-6 border border-black rounded-lg shadow-lg mb-2 ${dateFrom3 && dateTo3 ? 'opacity-100':'opacity-30'}`} disabled={!dateFrom3 && !dateTo3}>{loader3 ? 'chargement...':'Afficher'}</button>
                    {
                        dateTo3 && dateFrom3 &&  <p className="mb-2">Somme total entre le {dateTo3} et {dateFrom3} est : {tresor ? tresor + 'fcfa': ''} </p>
                    }
                    {msg3 &&
                     <div className="flex items-center justify-between max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded">
                        <div className="flex items-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 14.167q.354 0 .593-.24.24-.24.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.593q0 .354.24.594t.593.24m-.834-3.334h1.667v-5H9.166zm.833 7.5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.645-1.781 8.4 8.4 0 0 1-1.782-2.646A8.1 8.1 0 0 1 1.666 10q0-1.73.656-3.25a8.4 8.4 0 0 1 1.782-2.646 8.4 8.4 0 0 1 2.645-1.781A8.1 8.1 0 0 1 10 1.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .657 3.25 8.1 8.1 0 0 1-.657 3.25 8.4 8.4 0 0 1-1.78 2.646 8.4 8.4 0 0 1-2.647 1.781 8.1 8.1 0 0 1-3.25.656" fill="currentColor"/>
                            </svg>
                            <p className="text-sm ml-2">Oops! {msg3}</p>
                        </div>   
                        <button type="button" aria-label="close" className="active:scale-90 transition-all ml-2 cursor-pointer text-red-500 hover:text-red-700">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5 5 15M5 5l10 10" stroke="currentColor" />
                            </svg>
                        </button>
                    </div>}
                </form>
            </div>
         </div>


        <Footer/>
    </>
    )
}