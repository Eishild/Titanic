import React from "react"
import { useLoginForm } from "../../context/LoginFormContext"
import Login from "../../components/form/Login"
import Register from "../../components/form/Register"

export default function LoginFormComponent() {
  const loginForm = useLoginForm()

  return (
    <div className=" lg:w-1/4 m-auto p-10">
      {loginForm ? <Login /> : <Register />}
    </div>
  )
}
