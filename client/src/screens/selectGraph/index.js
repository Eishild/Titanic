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
          sex: !prev.sex,
          age: false,
          classe: false,
        }))
        break
      case "age":
        setSearchRule((prev) => ({
          sex: false,
          age: !prev.age,
          classe: false,
        }))
        break
      case "classe":
        setSearchRule((prev) => ({
          sex: false,
          age: false,
          classe: !prev.classe,
        }))
        break
      default:
        break
    }
  }

  const toPageGraph = () => {
    if (searchRule.sex === true) {
      navigate("/graphs/byGender")
    }
    if (searchRule.age === true) {
      navigate("/graphs/byAge")
    }
    if (searchRule.classe === true) {
      navigate("/graphs/byClasse")
    }
  }

  return (
    <div>
      <div className="flex-col px-4 justify-center text-center">
        <h1 className="text-6xl">Bienvenue</h1>
        <div className="items-center">
          <form className="flex flex-col m-auto lg:w-5/12 justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <h3>Choissez un domaine de recherche :</h3>
            </div>
            <div className="flex justify-center mt-3 gap-10">
              <div className="space-x-2">
                <label
                  className="md:w-2/3 text-gray-500 font-bold"
                  htmlFor="sex"
                >
                  Sexe
                </label>
                <input
                  className="mr-2 leading-tight"
                  id="sex"
                  type={"checkbox"}
                  checked={searchRule.sex}
                  onChange={() => checkboxChecker("sexe")}
                ></input>
              </div>
              <div className="space-x-2">
                <label
                  className="md:w-2/3 text-gray-500 font-bold"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  type={"checkbox"}
                  id="age"
                  className="mr-2 leading-tight"
                  checked={searchRule.age}
                  onChange={() => checkboxChecker("age")}
                ></input>
              </div>
              <div className="space-x-2">
                <label
                  className="md:w-2/3 text-gray-500 font-bold"
                  htmlFor="classe"
                >
                  Classe
                </label>
                <input
                  type={"checkbox"}
                  id="classe"
                  className="mr-2 leading-tight"
                  checked={searchRule.classe}
                  onChange={() => checkboxChecker("classe")}
                ></input>
              </div>
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
