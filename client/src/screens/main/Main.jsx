import React from "react"
import { useNavigate } from "react-router-dom"

const Main = () => {
  const navigate = useNavigate()
  return (
    <div className="flex-col justify-center text-center">
      <h1 className="text-6xl">Bienvenue</h1>
      <div className="mt-10">
        <p>Sur ce site vous pourez consulter les données liées au Titanic</p>
        <div className="flex justify-center gap-4">
          <button
            className="border-sky-500 border p-2 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200"
            onClick={() => navigate("/passengers")}
          >
            Liste des passagers
          </button>
          <button
            className="border-sky-500 border p-2 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200"
            onClick={() => navigate("/graphs")}
          >
            Statistique des passagers
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main
