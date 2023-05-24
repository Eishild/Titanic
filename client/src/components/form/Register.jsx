import React, { useState } from "react"
import MainButtonComponent from "../mainButton"
import TextInputComponent from "../textInput"
import Error from "./Error"
import { validatorsInscriptionFrom } from "../../screens/home/validators"
import apiService from "../../services"
import { useUpdateLoginForm } from "../../context/LoginFormContext"

const Register = () => {
  const [errors, setErrors] = useState([])
  const [signUp, setSignUp] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const updateLoginForm = useUpdateLoginForm()

  const handlePost = (e) => {
    try {
      e.preventDefault()

      const { firstname, lastname, email, password } = signUp
      validatorsInscriptionFrom(signUp)
      console.log("handlePostInscritpion")
      apiService
        .postUser({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        })
        .then((e) => {
          if (e.status === 200) {
            console.log("TESTSIGNUP", e)
            setSignUp({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
            })
            updateLoginForm(true)
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastname"
          >
            Nom
          </label>
          <Error err={errors.filter((e) => e.type === "lastname")} />
          <TextInputComponent
            id={"lastname"}
            type={"text"}
            placeholder={"Doe"}
            value={signUp.lastname}
            hasErrors={errors.filter((e) => e.type === "lastname")}
            onChange={(e) =>
              setSignUp((prev) => ({ ...prev, lastname: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstname"
          >
            Prénom
          </label>
          <Error err={errors.filter((e) => e.type === "firstname")} />
          <TextInputComponent
            id={"firstname"}
            type={"text"}
            placeholder={"John"}
            value={signUp.firstname}
            hasErrors={errors.filter((e) => e.type === "firstname")}
            onChange={(e) =>
              setSignUp((prev) => ({ ...prev, firstname: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <Error err={errors.filter((e) => e.type === "emailSignUp")} />
          <TextInputComponent
            id={"email"}
            type={"text"}
            value={signUp.email}
            placeholder={"johnDoe@gmail.com"}
            hasErrors={errors.filter((e) => e.type === "emailSignUp")}
            onChange={(e) =>
              setSignUp((prev) => ({ ...prev, email: e.target.value }))
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
          <Error err={errors.filter((e) => e.type === "passwordSignUp")} />
          <TextInputComponent
            id={"password"}
            type={"password"}
            value={signUp.password}
            placeholder={"******************"}
            hasErrors={errors.filter((e) => e.type === "passwordSignUp")}
            onChange={(e) =>
              setSignUp((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirmer mot de passe
          </label>
          <Error err={errors.filter((e) => e.type === "passwordSignUp")} />
          <TextInputComponent
            id={"confirmPassword"}
            type={"password"}
            value={signUp.confirmPassword}
            placeholder={"******************"}
            hasErrors={errors.filter((e) => e.type === "passwordSignUp")}
            onChange={(e) =>
              setSignUp((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex items-center justify-center">
          <MainButtonComponent
            onClick={(e) => handlePost(e, "handlePostInscritpion")}
            type={"submit"}
            title={"Inscription"}
          />
        </div>
      </form>
    </div>
  )
}

export default Register
