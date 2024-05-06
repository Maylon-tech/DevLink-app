import { FormEvent, useEffect, useState } from "react"
import Header from "../../components/Header"
import { Input } from "../../components/Input"
import { FiTrash } from "react-icons/fi"

import { db } from '../../services/firebaseConnection'
import {
  addDoc,    // adicionar um documento dentro de uma colecao. gera ID aleatorio. [e uma promisse]
  collection,
  onSnapshot,   // Fica monitorando o Banco em tempo Real - se houve mudanca ou Nao.
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore'

interface LinksProps {
  id:string
  name: string
  url: string
  bg: string
  color: string
}

const Adimin = () => {
  const [nameInput, setNameInput] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [textColorInput, setTextColorInput] = useState("#f1f1f1")
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")

  // Hook useState para Renderizar as listar construido.
  const [links, setLinks] = useState<LinksProps[]>([])

  //  Hook para causar efeito na Renderizacao dos Links na pagina _ a cada mudancas
  useEffect(() => {
    const linksRef = collection(db, 'links')  // acessando a collection de links.
    const queryRef = query(linksRef, orderBy("created", "asc")) //Busca personalizada ou Ordenacao. (ex: por orden de created_ data() )

    const unsub = onSnapshot(queryRef, (snapshot) => {   // callback para mandar o retorno do Banco. Big Listener...
      let lista = [] as LinksProps[]

      snapshot.forEach((doc) => {   // Percorre a lista em tempo real e devolve para o Front
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })
      setLinks(lista)
     
    })
    // Unmount the Component - Desmonta o componente se case SAIR da pagina ou componente.
    return () => {
      unsub()
      console.log("OPA ! Saiuuu mano veio,..")
    }

  }, [])

    // Registrar dados do Painel Admim no banco e renderizar os links personalizados
  const handleRegister = (e: FormEvent) => {
    e.preventDefault()
    // Verificacao dos campos - caso esteja vazio.
    if(nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos.!")
      return
    }

    // Cria Uma lista na collection do Firebase com nome de 'links' um Objeto. que retorna uma Promisse
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
    .then(() => {
      setNameInput("")    // Depois de cadastrado Deixa o Campo vazio.
      setUrlInput("")
      console.log("Cadastrado com Sucesso..!!")
    })
    .catch((error) => {
      console.log("Erro ao cadastrar no Banco" + error)
    })
  }

  // Remove links -- trash event  - Function async  _ Deleta em Tempo real no banco e pagina..
  const handleRemoveLink = async (id: string) => {
    const docRef = doc(db, "links", id)    // acessar o links no Banco pelo ID e nome do Link

    await deleteDoc(docRef)    // awaiting para ser deletado o links especifico.
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input 
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
        <Input
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        {/* Color Section Inputs */}
        <section className="flex my-4 gap-5">
          <div className="flex gap-4">
            <label className="text-white font-medium mt-2 mb-2">Background</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <label className="text-white font-medium mt-2 mb-2">Text Color</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
        </section>

        {/* janela de verificacao das cores */}
        {
          nameInput !== '' && (
            <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
              <label className="text-white font-medium mt-2 mb-2">Veja como esta ficando</label>
              <article
                className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-1"
                style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
              >
                <p
                  className="font-medium"
                  style={{ marginBottom: 8, marginTop: 8, color: textColorInput }}
                >
                  {nameInput}
                </p>
              </article>
            </div>
          )
        }

        <button 
          type="submit"
          className="bg-blue-600 mb-7 h-9 rounded-md text-white font-medium gap-4 flex items-center justify-center"
        >
          Cadastrar
        </button>

      </form>
        <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

        {
          links.map((item) => (
            <article
              key={item.id}
              className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
              style={{ backgroundColor: item.bg, color: item.color }}
            >
              <p className="">{item.name}</p>
              <div>
                <button 
                  className="border border-dashed p-1 rounded"
                  onClick={() => handleRemoveLink(item.id)}
                  >
                  <FiTrash size={18} color="#fff" />
                </button>
              </div>
            </article>
          ))
        }
    </div>
  )
}

export default Adimin