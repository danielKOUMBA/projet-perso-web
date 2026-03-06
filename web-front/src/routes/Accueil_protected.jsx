import { Navigate , Outlet } from "react-router-dom";
import { token } from "../api/api";
export default function Accueil_protected(){
   
   if (!token){
     return <Navigate to='/' replace/>
   }
   return <Outlet/>
}