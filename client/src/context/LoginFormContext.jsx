import React, { useState, useContext } from "react"

const LoginFormContext = React.createContext()
const UpdateUserNameContext = React.createContext()

export const useLoginForm = () => {
  return useContext(LoginFormContext)
}

export const useUpdateLoginForm = () => {
  return useContext(UpdateUserNameContext)
}

export const LoginFormProvider = ({ value, children }) => {
  const [loginForm, setLoginForm] = useState(value)
  return (
    <LoginFormContext.Provider value={loginForm}>
      <UpdateUserNameContext.Provider value={setLoginForm}>
        {children}
      </UpdateUserNameContext.Provider>
    </LoginFormContext.Provider>
  )
}

export default LoginFormProvider
