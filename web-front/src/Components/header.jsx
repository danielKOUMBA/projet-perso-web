import { useState } from "react"
import { Link } from "react-router-dom"
import { UserIcon ,XMarkIcon,Bars3Icon,MagnifyingGlassIcon,BellIcon} from "@heroicons/react/16/solid"
import logos from '../assets/logos.JPG'


export default function Header(){
  const [menu,setMenu]=useState(false)
  const [logout,setLogout]=useState(false)
    return(<>
       <header>
           <div className="fixed z-51 top-0 left-0 w-full bg-blue-100 flex  justify-between items-center gap-2 p-2 ">
              <div className="flex items-center gap-3">
              {menu?(
                 <XMarkIcon className='w-7' onClick={()=>setMenu(prev=>!prev)}/>
               ):(<Bars3Icon className='w-7' onClick={()=>setMenu((prev)=>(!prev))}/>)}
               <img src={logos} alt="logos" className="w-10 rounded-lg"/>
              </div>
              <div className="relative flex items-center gap-3">
                  <button onClick={()=>setLogout((prev)=>(!prev))}>
                       <UserIcon className='w-7'/>
                  </button>
                  <div className={`absolute top-13 z-20 right-1 bg-white border border-black rounded-lg p-1 font-bold overflow-hidden transition-all duration-500 ${logout? 'max-w-100 opacity-100': 'max-w-0 opacity-0' }`}>
                    <div>
                      <Link to='/'>
                           <p className="hover:underline text-center">se deconnecter</p>
                      </Link>
                    </div>
                  </div>
              </div>
           </div>
           
        </header>
    
      <main>
        <div>
          <div className={`fixed top-13 z-50 overflow-hidden transition-all duration-800 ${menu?'max-w-full':'max-w-0'}`}>
            <div className="w-2/3 h-screen bg-blue-200 p-4 ">
              <ul className="space-y-4">
                <li className=" w-full hover:bg-blue-100 p-3 cursor-pointer border-b border-blue-400 ">
                  <Link to='/accueil'>Accueil</Link>
                </li>
                <li className=" w-full hover:bg-blue-100 p-3 cursor-pointer border-b border-blue-400 ">
                  <Link to='/commandes'>Gestion des commandes</Link>
                </li>
                <li className=" w-full hover:bg-blue-100 p-3 cursor-pointer border-b border-blue-400 ">
                  <Link to='/tresor'>Gestions des tresoreries</Link>
                </li>
                <li className=" w-full hover:bg-blue-100 p-3 cursor-pointer border-b border-blue-400 ">
                  <Link to='/cout'>Gestions des couts</Link>
                </li>
                <li className=" w-full hover:bg-blue-100 p-3 cursor-pointer border-b border-blue-400 ">
                  <Link to='/chiffre'>Affichage du chiffre d'affaire</Link>
                </li>
              </ul>
            </div>
      
          </div>
            
        </div>
       
      </main>

     
    </>)
}