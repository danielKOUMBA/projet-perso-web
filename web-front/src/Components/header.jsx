import { useState } from "react"
import { Link } from "react-router-dom"
import { UserIcon ,XMarkIcon,Bars3Icon,MagnifyingGlassIcon,BellIcon} from "@heroicons/react/16/solid"



export default function Header(){
  const [menu,setMenu]=useState(false)
  const [logout,setLogout]=useState(false)
    return(
      <>
  
  <header>
  
  <div className="fixed top-0 left-0 w-full z-50 bg-green-100 flex justify-between items-center p-3 shadow-md">
  
  <div className="flex items-center gap-3">
  
  {menu ? (
  <XMarkIcon
  className="w-7 cursor-pointer"
  onClick={()=>setMenu(false)}
  />
  ) : (
  <Bars3Icon
  className="w-7 cursor-pointer"
  onClick={()=>setMenu(true)}
  />
  )}
  
  
  
  </div>
  
  
  <div className="relative">
  
  <button
  onClick={()=>setLogout(prev=>!prev)}
  className="cursor-pointer"
  >
  <UserIcon className="w-7"/>
  </button>
  
  
  <div className={`absolute right-0 mt-2 bg-white border border-green-200 rounded-lg shadow-md transition-all duration-300
  ${logout ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
  `}>
  
  <Link to='/'>
  <p className="px-4 py-2 hover:bg-green-100 rounded-lg text-center font-semibold">
  se deconnecter
  </p>
  </Link>
  
  </div>
  
  </div>
  
  </div>
  
  </header>
  
  
  
 
  <div
  onClick={()=>setMenu(false)}
  className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300
  ${menu ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
  />
  
  
  
  {/* MENU LATERAL */}
  <div
  className={`fixed top-0 left-0 h-screen w-72 bg-green-200 z-50 shadow-xl
  transform transition-transform duration-300 ease-out
  ${menu ? "translate-x-0" : "-translate-x-full"}
  `}
  >
  
  <div className="p-5 pt-16">
  
  <ul className="space-y-3">
  
  <li className="p-3 rounded-lg hover:bg-green-100 cursor-pointer font-medium">
  <Link to='/accueil'>Accueil</Link>
  </li>
  
  <li className="p-3 rounded-lg hover:bg-green-100 cursor-pointer font-medium">
  <Link to='/commandes'>Gestion des commandes</Link>
  </li>
  
  <li className="p-3 rounded-lg hover:bg-green-100 cursor-pointer font-medium">
  <Link to='/tresor'>Gestions des tresoreries</Link>
  </li>
  
  <li className="p-3 rounded-lg hover:bg-green-100 cursor-pointer font-medium">
  <Link to='/cout'>Gestions des couts</Link>
  </li>
  
  <li className="p-3 rounded-lg hover:bg-green-100 cursor-pointer font-medium">
  <Link to='/chiffre'>Affichage du chiffre d'affaire</Link>
  </li>
  
  </ul>
  
  </div>
  
  </div>
  
  </>
  )
  }