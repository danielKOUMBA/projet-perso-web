import  React, { useState }  from "react"
import Header from "../Components/header"
import Footer from "../Components/footer"
import image_1 from '../assets/image_1.JPG'
import image_2 from '../assets/image_2.JPG'
import image_3 from '../assets/image_3.JPG'
import { FaChevronLeft, FaChevronRight} from "react-icons/fa"

export default function Accueil(){
const image=[
  image_1,
  image_2,
  image_3
]

const [index,setIndex]=useState(0)

const nextImage=()=>{
  setIndex((prev)=>(prev===image.length-1?0:prev+1))
}

const OldImage=()=>{
  setIndex((prev)=>(prev===0?image.length-1:prev-1))
}
  return(
   <>
   <Header/>
    <div className="relative w-full pt-13 pb-20 overflow-y-auto">
        <img src={image[index]} alt="image" className="w-full object-cover"/>
        
          <button className="absolute left-0 top-1/3 -translate-y-1/2 bg-white/70 p-2 rounded-full" onClick={nextImage}>
              <FaChevronLeft className="w-10 h-5"/>
          </button>
          <button className="absolute right-0 top-1/3 -translate-y-1/2 bg-white/70 p-2 rounded-full " onClick={OldImage}>
              <FaChevronRight  className="w-10 h-5"/>
          </button>
          <div className="mt-4 mb-10 bg-red-400 text-center">
             <strong>BIENVENUE SUR VOTRE LOGICIEL DE GESTION</strong>
             <p className="text-white">nous vous presentons votre site de gestion chers admin il est a votre disposition une page de gestion des commandes , une de gestion des clients ,et une page de gestion de tresoreries</p>
             <strong> COMMENT CA FONCTIONNE ? </strong>
             <p className="text-white">Vous entrez les informations relatif a chaques client l'enregistrement des donnees est automatique et accessible 24h/24 
              Attention! garder votre mots de passe confidentielle 
             </p>
             <strong>BONNE EXPERIENCE A VOUS.</strong>
            

          </div>
    </div>

    

    
    <Footer/>
  </>
   

  )
}