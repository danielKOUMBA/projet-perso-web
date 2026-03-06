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
         setS(response.Polos)
         setA(response.Pantalon)
         setO(response.tee_shirt)
         setPe(response.Bijoux)
         setPh(response.chemise)
         setPr(response.Basket)

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
    return (
        <>
        <Header/>
        
        <div className="max-w-6xl mx-auto p-6 space-y-10 mt-24 mb-24">
        
        {/* COMMANDES */}
        
        <div className="bg-white shadow rounded-xl p-6">
        <p className="text-gray-600 mb-4 font-semibold">
        Statistique sur une période (commandes)
        </p>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 items-end">
        
        <div>
        <p>Date de debut</p>
        <input
        value={dateFrom}
        onChange={(e)=>setDateFrom(e.target.value)}
        type="date"
        className="border rounded-lg p-2 w-full"
        />
        </div>
        
        <div>
        <p>Date de fin</p>
        <input
        value={dateTo}
        onChange={(e)=>setDateTo(e.target.value)}
        type="date"
        className="border rounded-lg p-2 w-full"
        />
        </div>
        
        <button
        type="submit"
        className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition"
        >
        {loader ? "Chargement..." : "Afficher"}
        </button>
        
        </form>
        
        {dateTo && dateFrom && (
        <p className="mt-4 font-semibold">
        Somme totale entre {dateFrom} et {dateTo} : {somme ? somme + " fcfa" : ""}
        </p>
        )}
        
        {somme && (
        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
        
        <p>Polos : {s} fcfa</p>
        <p>Tee shirt : {o} fcfa</p>
        <p>Basket : {pr} fcfa</p>
        <p>Chemise : {ph} fcfa</p>
        <p>Bijoux : {pe} fcfa</p>
        <p>Pantalon : {a} fcfa</p>
        
        </div>
        )}
        
        {msg && (
        <p className="text-red-500 mt-3">Oops! {msg}</p>
        )}
        
        </div>
        
        
        {/* DEPENSES */}
        
        <div className="bg-white shadow rounded-xl p-6">
        
        <p className="text-gray-600 mb-4 font-semibold">
        Statistique sur une période (dépenses)
        </p>
        
        <form onSubmit={handleSubmit2} className="grid md:grid-cols-3 gap-4 items-end">
        
        <div>
        <p>Date de debut</p>
        <input
        value={dateFrom2}
        onChange={(e)=>setDateFrom2(e.target.value)}
        type="date"
        className="border rounded-lg p-2 w-full"
        />
        </div>
        
        <div>
        <p>Date de fin</p>
        <input
        value={dateTo2}
        onChange={(e)=>setDateTo2(e.target.value)}
        type="date"
        className="border rounded-lg p-2 w-full"
        />
        </div>
        
        <button
        type="submit"
        className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition"
        >
        {loader2 ? "Chargement..." : "Afficher"}
        </button>
        
        </form>
        
        {dateTo2 && dateFrom2 && (
        <p className="mt-4 font-semibold">
        Somme totale entre {dateFrom2} et {dateTo2} : {depense ? depense + " fcfa" : ""}
        </p>
        )}
        
        {depense && (
        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
        
        <p>Conception : {c} fcfa</p>
        <p>Salaire : {s2} fcfa</p>
        <p>Marketing : {m} fcfa</p>
        <p>Transport et Livraison : {t} fcfa</p>
        <p>Autres : {a2} fcfa</p>
        
        </div>
        )}
        
        {msg2 && (
        <p className="text-red-500 mt-3">Oops! {msg2}</p>
        )}
        
        </div>
        
        
        {/* BENEFICE */}
        
        <div className="bg-white shadow rounded-xl p-6">
        
        <p className="text-gray-600 mb-4 font-semibold flex items-center gap-2">
        Benefice de l'entreprise entre deux périodes
        <FaDollarSign/>
        </p>
        
        <form onSubmit={handleSubmit3} className="grid md:grid-cols-3 gap-4 items-end">
        
        <div>
        <p>Date de debut</p>
        <input
        value={dateFrom3}
        onChange={(e)=>setDateFrom3(e.target.value)}
        type="date"
        className="border rounded-lg p-2 w-full"
        />
        </div>
        
        <div>
        <p>Date de fin</p>
        <input
        value={dateTo3}
        onChange={(e)=>setDateTo3(e.target.value)}
        type="date"
        className="border rounded-lg p-2 w-full"
        />
        </div>
        
        <button
        type="submit"
        className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition"
        >
        {loader3 ? "Chargement..." : "Afficher"}
        </button>
        
        </form>
        
        {dateTo3 && dateFrom3 && (
        <p className="mt-4 font-semibold">
        Bénéfice entre {dateFrom3} et {dateTo3} : {tresor ? tresor + " fcfa" : ""}
        </p>
        )}
        
        {msg3 && (
        <p className="text-red-500 mt-3">Oops! {msg3}</p>
        )}
        
        </div>
        
        </div>
        
        <Footer/>
        </>
        )
        
}