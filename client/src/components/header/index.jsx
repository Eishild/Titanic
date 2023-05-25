import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateLoginForm } from "../../context/LoginFormContext"

export default function HeaderComponent() {
  const updateLoginForm = useUpdateLoginForm()

  const [login, setLogin] = useState(true)
  const token = localStorage.getItem("token")
  let navigate = useNavigate()

  const logoffUser = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  useEffect(() => {
    updateLoginForm(login)
  }, [login, updateLoginForm])

  return (
    <div className={"flex space-x-80 justify-between p-5 items-center"}>
      <div className="flex items-center">
        <h1
          className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          TitanicGraph
        </h1>
        {token && (
          <div className="ml-20 flex gap-3 ">
            <button
              onClick={() => navigate("/passengers")}
              className="border-sky-500 border px-2 h-10 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200"
            >
              Passagers
            </button>
            <button
              onClick={() => navigate("/graphs")}
              className="border-sky-500 border px-2 h-10 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200"
            >
              Statistiques
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center">
        {!token ? (
          <div className="flex items-center">
            <h1 className="mr-5" onClick={() => setLogin(true)}>
              Connexion
            </h1>
            <h1 className="" onClick={() => setLogin(false)}>
              Inscription
            </h1>
          </div>
        ) : (
          <h1 className="cursor-pointer" onClick={() => logoffUser()}>
            Deconnexion
          </h1>
        )}
      </div>
    </div>
  )
}
