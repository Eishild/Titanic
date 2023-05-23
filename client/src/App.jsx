import React, { useEffect } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./screens/home"
import LoginFormProvider from "./context/LoginFormContext"
import IsLoggedProvider from "./context/IsLoggedContext"
import HeaderComponent from "./components/header"
import { verifyToken } from "./tools"
import SearchPage from "./screens/searchPage"
import ByGenderPage from "./screens/byGender"
import ByClassePage from "./screens/byClasse"
import ByAgePage from "./screens/byAge"

function App() {
  useEffect(() => {
    console.log("TEEEEEESTAPP", verifyToken())
  }, [])

  return (
    <BrowserRouter>
      <LoginFormProvider value={true}>
        <IsLoggedProvider value={false}>
          <HeaderComponent isLoggedProps={verifyToken()} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/byGender" element={<ByGenderPage />} />
            <Route path="/byClasse" element={<ByClassePage />} />
            <Route path="/byAge" element={<ByAgePage />} />
          </Routes>
        </IsLoggedProvider>
      </LoginFormProvider>
    </BrowserRouter>
  )
}

export default App
