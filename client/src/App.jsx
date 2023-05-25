import React, { useEffect } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./screens/home"
import LoginFormProvider from "./context/LoginFormContext"
import IsLoggedProvider from "./context/IsLoggedContext"
import HeaderComponent from "./components/header"
import { verifyToken } from "./tools"
import SearchPage from "./screens/selectGraph"
import ByGenderPage from "./screens/byGender"
import ByClassePage from "./screens/byClasse"
import ByAgePage from "./screens/byAge"
import Passengers from "./screens/passengers/Passengers"
import Main from "./screens/main/Main"
import GraphHome from "./screens/graphHom/GraphHome"

function App() {
  return (
    <BrowserRouter>
      <LoginFormProvider value={true}>
        <IsLoggedProvider value={false}>
          <HeaderComponent isLoggedProps={verifyToken()} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Main />} />
            <Route path="/passengers" element={<Passengers />} />
            <Route path="/graphs" element={<GraphHome />}>
              <Route index element={<SearchPage />} />
              <Route path="byGender" element={<ByGenderPage />} />
              <Route path="byClasse" element={<ByClassePage />} />
              <Route path="byAge" element={<ByAgePage />} />
            </Route>
          </Routes>
        </IsLoggedProvider>
      </LoginFormProvider>
    </BrowserRouter>
  )
}

export default App
