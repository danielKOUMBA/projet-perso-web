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
    return(<>
    <Header/>
    {msg &&  <div className="flex items-center justify-between max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded">
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
    <div className="flex justify-center" >
        <div className="absolute top-16">
                <h1 className="font-bold">Statistique en temps reel du chiffre d'affaire</h1>
               
                <div className="absolute top-25 ">
                    <p className="font-bold mb-2">Tresorerie : {res ? res + 'fcfa' :0+ 'fcfa'}</p>
                    <button className=" border border-blue-900 bg-blue-100 text-black rounded-lg p-1 cursor-pointer" onClick={tresor}>Afficher la tresorerie</button>
                    
                </div>
               
            </div>
            <div className="absolute top-65 ">
                <p className="mt-1 font-bold">statistique comparant le type de verre:</p>
                
                <button className=" border border-blue-900 bg-blue-100 text-black rounded-lg p-1 cursor-pointer" onClick={datas}>rafraichir</button>
       
                    <Dashboard data={data} />
               
                
            </div>
    </div>
   
    
    <div className="flex justify-center">
        <div className="absolute top-135 pb-15 ">
            <div className="m-2 flex justify-center">
                  <button className="border border-black-500 mb-2 p-2 rounded-lg bg-blue-100" onClick={(handleView)}>Voir les details</button>    
            </div>
         <div className="absolute top-50 left-30 right-35 pb-30 w-full flex justify-center">
            <ul>
             <li>
                {info.map((inf)=>(
                    <div className='flex justify-between gap-5 p-2 border border-black-500 rounded-lg mb-3' key={inf.id}>
                        <p>{noms.includes(inf.nom)? <span className="font-bold">Nature de l'operation</span>: <span className="font-bold">Nom</span> }: {inf.nom}</p>
                        <p> <span className="font-bold ">PRIX :</span> {inf.prix} fcfa</p>
                        <p> <span className="font-bold">DATE :</span> {inf.date}</p>
                        <p><span className="font-bold">Reste a payer :</span> {inf.reste_a_payer}</p>
                        <p><span className="font-bold">type :</span> {inf.type} {inf.type=='entree'?(<FaPlus color="white" className="bg-green-500 rounded-full p-1"/>):(<FaMinus color="white" className="bg-red-500 rounded-full p-1"/>)}</p>
                        <p><span className="font-bold">Solde initial:</span> {inf.si} fcfa</p>
                        <p><span className="font-bold"> Solde final:</span>{inf.sf} fcfa</p>
                    </div>
                    
                ))}
              </li>
              </ul>
          </div>
        </div>
    </div>
        
    <Footer/>
    </>)
}