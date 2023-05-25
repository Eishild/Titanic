import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"
import { verifyToken } from "../../tools"
import { useNavigate } from "react-router-dom"
import { Bar } from "react-chartjs-2"
import apiService from "../../services"
import MainButtonComponent from "../../components/mainButton"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export default function ByGenderPage() {
  const [passengersData, setPassengersData] = useState([])
  const [categories, setCategories] = useState({
    average: false,
    derivation: false,
    survived: false,
  })
  const labels = ["Genre"]
  const navigate = useNavigate()

  const handleGetPassengers = async () => {
    const d = await apiService.getAllPassengers()
    setPassengersData(d.data.value)
  }

  useEffect(() => {
    if (verifyToken() === null) {
      navigate("/")
    }
    handleGetPassengers()
  }, [navigate])

  const getAverageAgeByGender = (gender) => {
    let b = []

    passengersData
      .filter((e) => e.age !== undefined)
      .map((e) => {
        if (gender === "homme" && e.sex === "male") {
          b.push(e.age)
        } else if (gender === "femme" && e.sex === "female") {
          b.push(e.age)
        }
      })

    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length
    return average(b)
  }

  function standardDeviation(gender) {
    let b = []

    passengersData
      .filter((e) => e.age !== undefined)
      .map((e) => {
        if (gender === "homme" && e.sex === "male") {
          b.push(e.age)
        } else if (gender === "femme" && e.sex === "female") {
          b.push(e.age)
        }
      })

    let mean =
      b.reduce((acc, curr) => {
        return acc + curr
      }, 0) / b.length

    b = b.map((el) => {
      return (el - mean) ** 2
    })

    let total = b.reduce((acc, curr) => acc + curr, 0)

    return Math.sqrt(total / b.length)
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Titanic Data",
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: categories.average
          ? "moyenne d'age des femmes"
          : "Nombre de Femmes",
        data: categories.average
          ? labels.map(() => Math.round(getAverageAgeByGender("femme")))
          : labels.map(
              () => passengersData.filter((e) => e.sex === "female").length
            ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: categories.average
          ? "moyenne d'age des hommes"
          : "Nombre d'hommes",
        data: categories.average
          ? labels.map(() => Math.round(getAverageAgeByGender("homme")))
          : labels.map(
              () => passengersData.filter((e) => e.sex === "male").length
            ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }
  // console.log("data", data)

  const dataSurvived = {
    labels,
    datasets: [
      {
        label: "nombre de femmes qui ont survécue",
        data: labels.map(
          () =>
            passengersData.filter((e) => e.sex === "female" && e.survived === 1)
              .length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "nombre d'homme qui ont survécue",
        data: labels.map(
          () =>
            passengersData.filter((e) => e.sex === "male" && e.survived === 1)
              .length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  const dataDerivation = {
    labels,
    datasets: [
      {
        label: "Ecart type chez les femmes",
        data: labels.map(() => standardDeviation("femme")),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Ecart type chez les hommes",
        data: labels.map(() => standardDeviation("homme")),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  return (
    <div>
      <div className="flex-col justify-center text-center">
        <h1 className="text-6xl">Données retranscrie</h1>
        <form className="flex m-auto w-5/12 justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label>Moyenne d'age</label>
          <input
            type={"checkbox"}
            checked={categories.average}
            onChange={() =>
              setCategories((prev) => ({
                average: !prev.average,
                derivation: false,
                survived: false,
              }))
            }
          ></input>
          <label>Ecart type</label>
          <input
            type={"checkbox"}
            checked={categories.derivation}
            onChange={() =>
              setCategories((prev) => ({
                average: false,
                derivation: !prev.derivation,
                survived: false,
              }))
            }
          ></input>
          <label>Survecue</label>
          <input
            type={"checkbox"}
            checked={categories.survived}
            onChange={() =>
              setCategories((prev) => ({
                average: false,
                derivation: false,
                survived: !prev.survived,
              }))
            }
          ></input>
        </form>
        <div className="w-2/3 mx-auto">
          {categories.derivation ? (
            <Bar options={options} data={dataDerivation} />
          ) : (
            <Bar
              options={options}
              data={categories.survived ? dataSurvived : data}
            />
          )}
          <MainButtonComponent
            title={"Remove"}
            onClick={() => navigate("/graphs")}
          />
        </div>
      </div>
    </div>
  )
}
