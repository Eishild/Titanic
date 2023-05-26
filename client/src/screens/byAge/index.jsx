import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { verifyToken } from "../../tools"
import { useNavigate } from "react-router-dom"
import { Bar } from "react-chartjs-2"
import apiService from "../../services"
import MainButtonComponent from "../../components/mainButton/index"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ByAgePage() {
  const [passengersData, setPassengersData] = useState([])
  const [categories, setCategories] = useState({
    total: true,
    average: false,
    derivation: false,
    survived: false,
  })
  const labels = ["Age"]

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

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Titanic Data",
      },
      maintainAspectRatio: true,
    },
  }
  const getAverageAge = () => {
    let b = []
    passengersData.filter((e) => e.age !== undefined).map((e) => b.push(e.age))
    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length
    return average(b)
  }

  function standardDeviation(ageMin, ageMax) {
    let b = []

    passengersData.filter((e) => e.age !== undefined).map((e) => b.push(e.age))
    let mean =
      b
        .filter((e) => e >= ageMin && e <= ageMax)
        .reduce((acc, curr) => {
          return acc + curr
        }, 0) / b.length

    b = b.map((el) => {
      return (el - mean) ** 2
    })

    let total = b.reduce((acc, curr) => acc + curr, 0)

    return Math.sqrt(total / b.length)
  }

  const dataAverage = {
    labels,
    datasets: [
      {
        label: "Moyenne d'age global",
        data: labels.map(() => Math.round(getAverageAge())),
        backgroundColor: "red",
      },
    ],
  }

  const data = {
    labels,
    datasets: [
      {
        label: "0-10 ans",
        data: labels.map(
          () => passengersData.filter((e) => e.age >= 0 && e.age <= 10).length
        ),
        backgroundColor: "rgba(50, 99, 132, 0.5)",
      },
      {
        label: "10-20 ans",
        data: labels.map(
          () => passengersData.filter((e) => e.age >= 10 && e.age <= 20).length
        ),
        backgroundColor: "rgba(55, 162, 235, 0.5)",
      },
      {
        label: "20-30 ans",
        data: labels.map(
          () => passengersData.filter((e) => e.age >= 20 && e.age <= 30).length
        ),
        backgroundColor: "rgba(60, 162, 235, 0.5)",
      },
      {
        label: "30-40 ans",
        data: labels.map(
          () => passengersData.filter((e) => e.age >= 30 && e.age <= 40).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "40-50 ans",
        data: labels.map(
          () => passengersData.filter((e) => e.age >= 40 && e.age <= 50).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "50+ ans",
        data: labels.map(
          () => passengersData.filter((e) => e.age >= 50).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "50+ ans",
        data: labels.map(
          () => passengersData.filter((e) => e.age === null).length
        ),
        backgroundColor: "black",
      },
    ],
  }
  const dataSurvived = {
    labels,
    datasets: [
      {
        label: "SURVIE DES 0-10 ans ",
        data: labels.map(
          () =>
            passengersData.filter(
              (e) => e.survived === 1 && e.age >= 0 && e.age <= 10
            ).length
        ),
        backgroundColor: "rgba(50, 99, 132, 0.5)",
      },
      {
        label: "SURVIE DES 10-20 ans ",
        data: labels.map(
          () =>
            passengersData.filter(
              (e) => e.survived === 1 && e.age >= 10 && e.age <= 20
            ).length
        ),
        backgroundColor: "rgba(55, 162, 235, 0.5)",
      },
      {
        label: "SURVIE DES 20-30 ans ",
        data: labels.map(
          () =>
            passengersData.filter(
              (e) => e.survived === 1 && e.age >= 20 && e.age <= 30
            ).length
        ),
        backgroundColor: "rgba(60, 162, 235, 0.5)",
      },
      {
        label: "SURVIE DES 30-40 ans ",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              categories.survived
                ? e.survived === 1 && e.age >= 30 && e.age <= 40
                : e.age >= 30 && e.age <= 40
            ).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "SURVIE DES 40-50 ans ",
        data: labels.map(
          () =>
            passengersData.filter(
              (e) => e.survived === 1 && e.age >= 40 && e.age <= 50
            ).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "SURVIE DES 50+ ans ",
        data: labels.map(
          () =>
            passengersData.filter((e) => e.survived === 1 && e.age >= 50).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "",
        data: labels.map(() => passengersData.filter((e) => null).length),
        backgroundColor: "black",
      },
    ],
  }

  const dataDerivation = {
    labels: ["Ecart type"],
    datasets: [
      {
        label: "0-10",
        data: labels.map(() => standardDeviation(0, 10)),
        backgroundColor: "rgba(50, 99, 132, 0.5)",
      },
      {
        label: "10-20",
        data: labels.map(() => standardDeviation(10, 20)),
        backgroundColor: "rgba(55, 162, 235, 0.5)",
      },
      {
        label: "20-30",
        data: labels.map(() => standardDeviation(20, 30)),
        backgroundColor: "rgba(60, 162, 235, 0.5)",
      },
      {
        label: "30-40",
        data: labels.map(() => standardDeviation(30, 40)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "40-50",
        data: labels.map(() => standardDeviation(40, 50)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "50+",
        data: labels.map(() => standardDeviation(50, 100)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  return (
    <div>
      <div className="flex-col justify-center text-center px-4">
        <h1 className="text-4xl">Données retranscrie</h1>
        <form className="flex m-auto lg:w-5/12 justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className=" flex flex-col space-x-2">
            <label htmlFor="total">Nombre de Passagers</label>
            <input
              type={"checkbox"}
              checked={categories.total}
              id="total"
              onChange={() =>
                setCategories((prev) => ({
                  ...prev,
                  total: !prev.total,
                }))
              }
            ></input>
          </div>
          <div className=" flex flex-col space-x-2">
            <label htmlFor="average">Moyenne d'age</label>
            <input
              type={"checkbox"}
              checked={categories.average}
              id="average"
              onChange={() =>
                setCategories((prev) => ({
                  ...prev,
                  average: !prev.average,
                }))
              }
            ></input>
          </div>
          <div className="flex flex-col space-x-2">
            <label htmlFor="derivation">Ecart type</label>
            <input
              type={"checkbox"}
              id="derivation"
              checked={categories.derivation}
              onChange={() =>
                setCategories((prev) => ({
                  ...prev,
                  derivation: !prev.derivation,
                }))
              }
            ></input>
          </div>
          <div className=" flex flex-col space-x-2">
            <label htmlFor="survived">Survecue</label>
            <input
              type={"checkbox"}
              id="survived"
              checked={categories.survived}
              onChange={() =>
                setCategories((prev) => ({
                  ...prev,
                  survived: !prev.survived,
                }))
              }
            ></input>
          </div>
        </form>
        <div className="w-[80vw] h-[350px] lg:max-h-[650px] lg:h-screen mx-auto">
          <MainButtonComponent
            title={"Retour"}
            onClick={() => navigate("/graphs")}
          />
          <div className="h-full">
            {categories.total && <Bar options={options} data={data} />}
            {categories.average && <Bar options={options} data={dataAverage} />}
            {categories.derivation && (
              <Bar options={options} data={dataDerivation} />
            )}
            {categories.survived && (
              <Bar options={options} data={dataSurvived} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
