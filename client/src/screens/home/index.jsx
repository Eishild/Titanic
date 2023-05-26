import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { verifyToken } from "../../tools"
import LoginFormComponent from "./loginForm"

export default function LoginScreen() {
  let navigate = useNavigate()
  useEffect(() => {
    if (verifyToken() !== null) {
      navigate("/home")
    }
  }, [navigate])

  return (
    <div>
      <div className="flex-col justify-center text-center p-4">
        <h1 className="text-6xl">Bienvenue sur Titanic</h1>
        <h4 className="text-2xl">
          Connectez-vous ou inscrivez vous afin d'effectuer des recherches
          statistique sur les passagers du titanic.
        </h4>
        <LoginFormComponent />
      </div>
    </div>
  )
}
