import { FormEvent, useEffect, useState } from "react"
import Header from "../../components/Header"
import { Input } from "../../components/Input"

import { db } from '../../services/firebaseConnection'
import {
  setDoc,   // Cria um item de forma manual.
  doc,  // Cria um item do Document com ID aleatorio.
  getDoc   // Buscar uma vez o unico document.
} from 'firebase/firestore'

const NetWorks = () => {
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
        .then((snapshot) => {
          if(snapshot.data() !== undefined) {
            setFacebook(snapshot.data()?.facebook)
            setInstagram(snapshot.data()?.instagram)
            setYoutube(snapshot.data()?.youtube)
          }
          console.log(snapshot.data())
        })
    }

    loadLinks()  
  }, [])

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    })
    .then (() => {
      console.log("cadastrado com sucesso..")
    })
    .catch((err) => {
      console.log("ERRO ao salvar" + err)
    })

  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

      <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
        <label htmlFor="input-social" className="text-white font-medium mt-2 mb-2">Link do Facebook</label>
        <Input 
          type="url"
          placeholder="Digite a URL do facebook..."
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <Input 
          type="url"
          placeholder="Digite a URL do Instagram..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <Input
          type="url"
          placeholder="Digite a URL do youtube..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />

        <button 
          type="submit" 
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
        >
          Salvar Links
        </button>
      </form>
    </div>
  )
}

export default NetWorks