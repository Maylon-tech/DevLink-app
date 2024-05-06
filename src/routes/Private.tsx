import { ReactNode, useState, useEffect } from 'react'

import { auth } from '../services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

interface PrivateProps {
  children: ReactNode
}

const Private = ({ children }: PrivateProps):any => {
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => { // Observer - fica observando os status do User
      if(user) {
        console.log(user)
        const userData = {
          uid: user?.uid,
          email: user?.email
        }

        localStorage.setItem("@reactlinks", JSON.stringify(userData))
        setLoading(false)
        setSigned(true)

      } else {
        console.log('nao tem user logado...')
        setLoading(false)
        setSigned(false)
      }
    })

    return () => { unsub() }

  }, [])
  // Tirar o efeito de carregamento
  if(loading) {
    return <div></div>
  }

  // Se nao estiver Logado entao redireciona para /login..
  if(!signed) {
    return <Navigate to="/login" />
  }

  return children
}

export default Private