export let token=null

const Base_url='https://projet-perso-back.onrender.com'
export default function setToken(tok){
    token=tok
    return token
}

export async function apiFetch(endpoint,options={}){
    let headers={
        'Content-Type':'application/json',
        ...options.headers
    }
    const acces_token=setToken(token)
    if (acces_token){
        headers['Authorization']=`Bearer ${acces_token}`
    }
    
    const res=await fetch(Base_url+endpoint,{
        method:options.method||'GET',
        headers,
        body:options.body
    })
     
    if (res.status===401){
        const refreshed=await refresh_token()

        if(!refreshed){
            window.location.href='/';
            return;
        }

        const data= await refreshed.json()
            setToken(data.new_token)
            headers['Authorization']=`Bearer ${token}`

        const res2=await fetch(Base_url+endpoint,{
            method:options.method||'GET',
            headers,
            body:options.body
        })
        return res2.json()
             
        

    }
    return res.json()
    
}

async function refresh_token() {
    const res=await fetch(Base_url+'/api/refresh',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include'
    })

    if (!res.ok) return ;

    const data=await res.json()
      const refresh_=setToken(data.new_token)
           return refresh_;

}