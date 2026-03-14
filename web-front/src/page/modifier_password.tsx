import React, { useState } from "react"
import setToken, { apiFetch } from "../api/api"
import { useNavigate } from "react-router-dom"

export default function Modifier_password(){

const navigate = useNavigate()

const [erreur,setErreur] = useState('')
const [email,setEmail] = useState('')
const [OldPassword,setOldPassword] = useState('')
const [NewPassword,setNewPassword] = useState('')

// Validation mot de passe
const passwordRules = {
length: NewPassword.length >= 8,
upper: /[A-Z]/.test(NewPassword),
lower: /[a-z]/.test(NewPassword),
number: /[0-9]/.test(NewPassword),
special: /[^A-Za-z0-9]/.test(NewPassword)
}

const passwordValid = Object.values(passwordRules).every(Boolean)

async function handleSubmit(e){
e.preventDefault()

if(!passwordValid){
setErreur("Le mot de passe ne respecte pas les règles")
return
}

try{

const data = await apiFetch('/api/update_password',{
method:'POST',
body:JSON.stringify({email,OldPassword,NewPassword})
})

if(data.token){
setToken(data.token)
navigate('/accueil')
}else{
setErreur(data)
console.log(data)
}

}catch(err){
console.log(err)
}
}

return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<form
onSubmit={handleSubmit}
className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
>

<h2 className="text-2xl font-bold text-center mb-6">
Modifier le mot de passe
</h2>

{erreur &&
<div className="bg-red-500 text-white text-center rounded-lg p-2 mb-4">
{erreur}
</div>}

<input
type="email"
placeholder="Email..."
required
className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Ancien mot de passe..."
required
className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
onChange={(e)=>setOldPassword(e.target.value)}
/>

<input
type="password"
placeholder="Nouveau mot de passe..."
required
className="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
onChange={(e)=>setNewPassword(e.target.value)}
/>

{/* Validation en direct */}

<div className="text-sm mb-4">

<p className={passwordRules.length ? "text-green-600" : "text-red-500"}>
{passwordRules.length ? "✔" : "✖"} 8 caractères minimum
</p>

<p className={passwordRules.upper ? "text-green-600" : "text-red-500"}>
{passwordRules.upper ? "✔" : "✖"} Une majuscule
</p>

<p className={passwordRules.lower ? "text-green-600" : "text-red-500"}>
{passwordRules.lower ? "✔" : "✖"} Une minuscule
</p>

<p className={passwordRules.number ? "text-green-600" : "text-red-500"}>
{passwordRules.number ? "✔" : "✖"} Un chiffre
</p>

<p className={passwordRules.special ? "text-green-600" : "text-red-500"}>
{passwordRules.special ? "✔" : "✖"} Un caractère spécial
</p>

</div>

<button
type="submit"
className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-lg transition"
>
Modifier
</button>

</form>

</div>

)
}
