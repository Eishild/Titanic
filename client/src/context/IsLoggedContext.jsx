import { useState, useContext, createContext } from "react"

const IsLoggedContext = createContext()
const UpdateIsLoggedContext = createContext()

export const useIsLogged = () => {
  return useContext(IsLoggedContext)
}

export const useUpdateIsLogged = () => {
  return useContext(UpdateIsLoggedContext)
}

export const IsLoggedProvider = ({ value, children }) => {
  const [isLogged, setIsLogged] = useState(value)
  return (
    <IsLoggedContext.Provider value={isLogged}>
      <UpdateIsLoggedContext.Provider value={setIsLogged}>
        {children}
      </UpdateIsLoggedContext.Provider>
    </IsLoggedContext.Provider>
  )
}

export default IsLoggedProvider
