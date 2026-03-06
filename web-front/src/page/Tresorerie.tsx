import React, { useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Dashboard from "../Components/dashboard";
import { apiFetch } from "../api/api";
import { ChartData } from "chart.js";
import { FaPlus,FaMinus,FaDollarSign} from "react-icons/fa";


type info={
    id:number
    nom:string
    prix:number
    date:string
    reste_a_payer:number
    type:string
    si:number 
    sf:number
}
type My_Data= ChartData<'bar',number[],string>
export default function Tresorerie(){
const[res,setRes]=useState('')
const[msg,setmsg]=useState('')
setTimeout(()=>setmsg(''),5000)
const[data,setData]=useState<My_Data>({
    'labels':[],
    'datasets':[]
})
const [info,setInfo]=useState<info[]>([])
const noms=['Autres','Marketing','Transport et Livraison','Conception','Salaire']

async function tresor(){
        try{
            const response=await apiFetch('/api/tresorerie',{
                method:'POST',
            })
            setRes(response)
        }catch(err){
            console.log(err)
        }
        
    }
 async function datas(){
        try{
            const response=await apiFetch('/api/dash',{
                method:'POST',
            })
            setData({
                labels:response.labels,
                datasets:[
                    { 
                    label:'Ventes',
                    data:response.values,
                    backgroundColor:'rgba(75,192,192,0.4)'
                    }
            ]
        })
      

        }catch(err){
            console.log(err)
        }
       }

 async function handleView(){
    try{
        const data=await apiFetch('/api/tresor_items',{
            method:'POST'
        })
        if (data.items){
            setInfo(data.items)  
        }else{
            setmsg(data.message)
            console.log(msg)
        }
       
    }catch(err){
        console.log(err)
    }
 }
    
    
return (
<>
<Header/>

{msg && (
<div className="flex justify-center mt-4">
<div className="flex items-center justify-between max-w-xl w-full bg-red-100 text-red-600 px-4 py-2 rounded-lg shadow">
<p className="text-sm">Oops! {msg}</p>
</div>
</div>
)}

<div className="max-w-6xl mx-auto p-6 space-y-10 mt-24 mb-24">

{/* STATISTIQUE */}
<div className="bg-white rounded-xl shadow p-6 text-center">
<h1 className="text-xl font-bold mb-4">
Statistique en temps réel du chiffre d'affaire
</h1>

<p className="font-semibold text-lg mb-3">
Tresorerie : {res ? res + " fcfa" : "0 fcfa"}
</p>

<button
className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
onClick={tresor}
>
Afficher la tresorerie
</button>
</div>


{/* GRAPHIQUE */}
<div className="bg-white rounded-xl shadow p-6 text-center">
<p className="font-bold mb-3">
Statistique comparant le type de verre
</p>

<button
className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
onClick={datas}
>
Rafraichir
</button>

<div className="flex justify-center">
<Dashboard data={data} />
</div>
</div>


{/* DETAILS */}
<div className="bg-white rounded-xl shadow p-6">

<div className="flex justify-center mb-6">
<button
className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
onClick={handleView}
>
Voir les détails
</button>
</div>

<div className="space-y-4">

{info.map((inf) => (

<div
key={inf.id}
className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-lg shadow-sm bg-gray-50"
>

<p>
<span className="font-bold">
{noms.includes(inf.nom) ? "Nature :" : "Nom :"}
</span>{" "}
{inf.nom}
</p>

<p>
<span className="font-bold">Prix :</span> {inf.prix} fcfa
</p>

<p>
<span className="font-bold">Date :</span> {inf.date}
</p>

<p>
<span className="font-bold">Reste :</span> {inf.reste_a_payer}
</p>

<p className="flex items-center gap-2">
<span className="font-bold">Type :</span> {inf.type}

{inf.type === "entree" ? (
<FaPlus className="bg-green-500 text-white p-1 rounded-full" />
) : (
<FaMinus className="bg-red-500 text-white p-1 rounded-full" />
)}

</p>

<p>
<span className="font-bold">Solde initial :</span> {inf.si} fcfa
</p>

<p>
<span className="font-bold">Solde final :</span> {inf.sf} fcfa
</p>

</div>

))}

</div>

</div>

</div>

<Footer/>
</>
)
   
}