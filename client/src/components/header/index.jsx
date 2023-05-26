import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateLoginForm } from "../../context/LoginFormContext"

export default function HeaderComponent() {
  const [login, setLogin] = useState(true)
  const [selctedNav, setSelctedNav] = useState("")
  const [isMenuActive, setIsMenuActive] = useState(false)
  const updateLoginForm = useUpdateLoginForm()
  const token = localStorage.getItem("token")

  let navigate = useNavigate()

  const handleNavigateMenu = (path, active) => {
    navigate(path)
    setIsMenuActive(false)
    setSelctedNav(active)
  }
  const handleNavigate = (path, active) => {
    navigate(path)
    setSelctedNav(active)
  }
  const logoffUser = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  useEffect(() => {
    updateLoginForm(login)
  }, [login, updateLoginForm])

  return (
    <div
      className={
        "flex relative justify-center lg:justify-between p-5 items-center"
      }
    >
      {isMenuActive ? (
        <img
          className="absolute lg:hidden left-5 z-40  w-[5vw]"
          onClick={() => setIsMenuActive((m) => !m)}
          src={"./assets/close.svg"}
          alt="menu"
        />
      ) : (
        <img
          className="absolute lg:hidden left-5 z-40 w-[4vw]"
          onClick={() => setIsMenuActive((m) => !m)}
          src={"./assets/menu.svg"}
          alt="menu"
        />
      )}

      <div
        className={`absolute lg:hidden top-0 flex flex-col justify-center items-center gap-8 bg-emerald-100 w-full h-screen transition-all duration-300 ${
          isMenuActive ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {token && (
          <div className="w-2/3 flex flex-col gap-5">
            <button
              onClick={() => {
                handleNavigateMenu("/home", "home")
              }}
              className={`border-sky-500 border px-2 h-10 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200 ${
                (selctedNav === "home" ||
                  window.location.pathname === "/home") &&
                "bg-sky-500 text-white"
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => {
                handleNavigateMenu("/passengers", "passengers")
              }}
              className={`border-sky-500 border px-2 h-10 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200 ${
                (selctedNav === "passengers" ||
                  window.location.pathname === "/passengers") &&
                "bg-sky-500 text-white"
              }`}
            >
              Passagers
            </button>
            <button
              onClick={() => {
                handleNavigateMenu("/graphs")
              }}
              className={`border-sky-500 border px-2 h-10 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200 ${
                (selctedNav === "graphs" ||
                  window.location.pathname === "/graphs") &&
                "bg-sky-500 text-white"
              }`}
            >
              Statistiques
            </button>
          </div>
        )}
        {!token ? (
          <>
            <button
              className="mr-5"
              onClick={() => {
                setLogin(true)
                setIsMenuActive(false)
              }}
            >
              Connexion
            </button>
            <button
              className=""
              onClick={() => {
                setLogin(false)
                setIsMenuActive(false)
              }}
            >
              Inscription
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => logoffUser()}
          >
            Deconnexion
          </button>
        )}
      </div>
      <div className="flex items-center">
        <h1
          className="font-medium leading-tight text-[8vw] lg:text-5xl mt-0 mb-2 text-blue-600 cursor-pointer"
          onClick={() => {
            navigate("/home")
          }}
        >
          TitanicGraph
        </h1>
        {token && (
          <div className="hidden lg:ml-20 lg:flex gap-3 ">
            <button
              onClick={() => {
                handleNavigate("/home", "home")
              }}
              className={`border-sky-500 border px-2 h-10 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200 ${
                (selctedNav === "home" ||
                  window.location.pathname === "/home") &&
                "bg-sky-500 text-white"
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleNavigate("/passengers", "passengers")}
              className={`border-sky-500 border px-2 h-10 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200 ${
                (selctedNav === "passengers" ||
                  window.location.pathname === "/passengers") &&
                "bg-sky-500 text-white"
              }`}
            >
              Passagers
            </button>
            <button
              onClick={() => handleNavigate("/graphs", "graphs")}
              className={`border-sky-500 border px-2 h-10 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200 ${
                (selctedNav === "graphs" ||
                  window.location.pathname === "/graphs") &&
                "bg-sky-500 text-white"
              }`}
            >
              Statistiques
            </button>
          </div>
        )}
      </div>
      <div className="hidden lg:flex items-center">
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
