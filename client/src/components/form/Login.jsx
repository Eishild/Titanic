import React, { useState } from "react"
import MainButtonComponent from "../mainButton"
import TextInputComponent from "../textInput"
import Error from "./Error"
import { validatorsLoginFrom } from "../../screens/home/validators"
import apiService from "../../services"
import { useNavigate } from "react-router-dom"
import { useUpdateIsLogged } from "../../context/IsLoggedContext"

const Login = () => {
  const [errors, setErrors] = useState([])
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  })
  const updateIslogin = useUpdateIsLogged()
  const navigate = useNavigate()

  const handlePost = (e) => {
    try {
      e.preventDefault()
      validatorsLoginFrom(signIn)
      apiService.postLogin(signIn).then((e) => {
        if (e.status === 200) {
          setSignIn({
            email: "",
            password: "",
          })
          navigate("/search")
          window.localStorage.setItem("token", e.data.token)
          updateIslogin(true)
        } else {
          setErrors([
            { type: e.response.data.type, message: e.response.data.message },
          ])
        }
      })
      setErrors([])
    } catch (error) {
      setErrors(error)
    }
  }
  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <Error err={errors.filter((e) => e.type === "login")} />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <Error err={errors.filter((e) => e.type === "email")} />
          <TextInputComponent
            id={"username"}
            type={"text"}
            value={signIn.email}
            placeholder={"johnDoe@gmail.com"}
            hasErrors={errors.filter((e) => e.type === "email")}
            onChange={(e) =>
              setSignIn((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <Error err={errors.filter((e) => e.type === "password")} />
          <TextInputComponent
            id={"password"}
            type={"password"}
            value={signIn.password}
            placeholder={"******************"}
            hasErrors={errors.filter((e) => e.type === "password")}
            onChange={(e) =>
              setSignIn((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <div className="flex items-center justify-center">
          <MainButtonComponent
            onClick={(e) => handlePost(e, "connection")}
            type={"submit"}
            title={"Connexion"}
          />
        </div>
      </form>
    </div>
  )
}

export default Login
