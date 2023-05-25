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
    responsive: true,
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
        label: categories.survived ? "SURVIE DES 0-10 ans " : "0-10 ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              categories.survived
                ? e.survived === 1 && e.age >= 0 && e.age <= 10
                : e.age >= 0 && e.age <= 10
            ).length
        ),
        backgroundColor: "rgba(50, 99, 132, 0.5)",
      },
      {
        label: categories.survived ? "SURVIE DES 10-20 ans " : "10-20 ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              categories.survived
                ? e.survived === 1 && e.age >= 10 && e.age <= 20
                : e.age >= 10 && e.age <= 20
            ).length
        ),
        backgroundColor: "rgba(55, 162, 235, 0.5)",
      },
      {
        label: categories.survived ? "SURVIE DES 20-30 ans " : "20-30 ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              categories.survived
                ? e.survived === 1 && e.age >= 20 && e.age <= 30
                : e.age >= 20 && e.age <= 30
            ).length
        ),
        backgroundColor: "rgba(60, 162, 235, 0.5)",
      },
      {
        label: categories.survived ? "SURVIE DES 30-40 ans " : "30-40 ans",
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
        label: categories.survived ? "SURVIE DES 40-50 ans " : "40-50 ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              categories.survived
                ? e.survived === 1 && e.age >= 40 && e.age <= 50
                : e.age >= 40 && e.age <= 50
            ).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: categories.survived ? "SURVIE DES 50+ ans " : "50+ ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              categories.survived
                ? e.survived === 1 && e.age >= 50
                : e.age >= 50
            ).length
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: categories.survived ? "" : "50+ ans",
        data: labels.map(
          () =>
            passengersData.filter((e) =>
              categories.survived ? null : e.age === null
            ).length
        ),
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
      <div className="flex-col justify-center text-center">
        <h1 className="text-6xl">Données retranscrie</h1>
        <form className="flex m-auto w-5/12 justify-around bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label>Moyenne</label>
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
              data={categories.average ? dataAverage : data}
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
