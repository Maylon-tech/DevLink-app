import { Link } from "react-router-dom"


const ErrorPage = () => {

  return (
    <div className="flex w-full justify-center items-center flex-col min-h-screen text-white">
      <h1 className="font-bold text-6xl mb-4">404</h1>
      <h1 className="font-bold text-4xl mb-4">Page Not Found...!</h1>
      <p className="italic text-1xl mb-4">Droped yourself into unknown page..</p>


      <Link to="/" className="bg-gray-50/20 py-1 px-4 rounded-md">
        Voltar para Home
      </Link>
    </div>
  )
}

export default ErrorPage