import {Routes,Route} from "react-router-dom";
import Accueil  from "../page/Accueil";
import Tresorerie from "../page/Tresorerie";
import CLient from "../page/Clients";
import Login from "../page/Login";
import Accueil_protected from "./Accueil_protected";
import Modifier_password from "../page/modifier_password";
import Commandes from "../page/Commande";
import Cout from "../page/Cout";
import Chiffres from "../page/chiffre";


export default function AppRoute() {
    return(
        <Routes>
            <Route>
               <Route path="/" element={<Login/>}/>
               <Route path="/register" element={<Modifier_password/>}/>
            </Route>
            <Route element={<Accueil_protected/>}>
                <Route path="/accueil" element={<Accueil/>}/>
                <Route path="/client" element={<CLient/>}/>
                <Route path="/tresor" element={<Tresorerie/>}/>
                <Route path="/commandes" element={<Commandes/>}/>
                <Route path="/cout" element={<Cout/>}/>
                <Route path='/chiffre' element={<Chiffres/>}/>
            </Route>
        </Routes>
            
    )
}