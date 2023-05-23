import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateLoginForm } from "../../context/LoginFormContext"
import TextInputComponent from "../textInput"

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
      <div className="flex">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
          TitanicGraph
        </h1>
      </div>
      <div className="flex items-center">
        <div className="mr-10">
          <TextInputComponent placeholder={"search..."} />
        </div>
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
