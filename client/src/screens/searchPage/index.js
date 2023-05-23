import React, { useState, useEffect } from "react"
import MainButtonComponent from "../../components/mainButton"
import { useNavigate } from "react-router-dom"
import { verifyToken } from "../../tools"

export default function SearchPage() {
  let navigate = useNavigate()
  const [searchRule, setSearchRule] = useState({
    sex: false,
    age: false,
    classe: false,
  })

  useEffect(() => {
    if (verifyToken() === null) {
      navigate("/")
    }
  }, [navigate])

  const checkboxChecker = (box) => {
    console.log(box)
    switch (box) {
      case "sexe":
        setSearchRule((prev) => ({
          ...prev,
          sex: !searchRule.sex,
          age: false,
          classe: false,
        }))
        break
      case "age":
        setSearchRule((prev) => ({
          ...prev,
          sex: false,
          age: !searchRule.age,
          classe: false,
        }))
        break
      case "classe":
        setSearchRule((prev) => ({
          ...prev,
          sex: false,
          age: false,
          classe: !searchRule.classe,
        }))
        break
      default:
        break
    }
  }

  const toPageGraph = () => {
    if (searchRule.sex === true) {
      navigate("/byGender")
    }
    if (searchRule.age === true) {
      navigate("/byAge")
    }
    if (searchRule.classe === true) {
      navigate("/byClasse")
    }
  }

  return (
    <div>
      <div className="flex-col justify-center text-center">
        <h1 className="text-6xl">Bienvenue</h1>
        <div className="items-center">
          <form className="flex m-auto w-5/12 justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <h3>Choissez un domaine de recherche :</h3>
            </div>
            <div>
              <label className="md:w-2/3 text-gray-500 font-bold">Sexe</label>
              <input
                className="mr-2 leading-tight"
                type={"checkbox"}
                checked={searchRule.sex}
                onChange={() => checkboxChecker("sexe")}
              ></input>
            </div>
            <div>
              <label className="md:w-2/3 text-gray-500 font-bold">Age</label>
              <input
                type={"checkbox"}
                className="mr-2 leading-tight"
                checked={searchRule.age}
                onChange={() => checkboxChecker("age")}
              ></input>
            </div>
            <div>
              <label className="md:w-2/3 text-gray-500 font-bold">Classe</label>
              <input
                type={"checkbox"}
                className="mr-2 leading-tight"
                checked={searchRule.classe}
                onChange={() => checkboxChecker("classe")}
              ></input>
            </div>
          </form>
        </div>
        <div className="mt-5">
          <MainButtonComponent
            onClick={() => toPageGraph()}
            title={"Analyser"}
          />
        </div>
      </div>
    </div>
  )
}
