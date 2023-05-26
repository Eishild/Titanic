import React, { useEffect, useState } from "react"
import apiService from "../../services"
import TextInputComponent from "../../components/textInput"
import List from "../../components/passengers/List"
import Pagination from "../../components/passengers/Pagination"
import { paginate } from "../../tools/paginate"

const Passengers = () => {
  const [allPassengers, setAllPassengers] = useState([])
  const [pageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const [isPassengerFiltred, setIsPassengerFiltred] = useState(false)
  const [searchDiasbled, setSearchDiasbled] = useState(false)

  useEffect(() => {
    const fetchPassengers = async () => {
      const getAllPassengers = await apiService.getAllPassengers()
      setAllPassengers(getAllPassengers.data.value)
    }
    fetchPassengers()
  }, [])

  const handleReGex = (data) => new RegExp(searchInput, "i").test(data.name)

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      setIsPassengerFiltred(true)
      setCurrentPage(0)
    }
  }

  const handleDeleteFilter = () => {
    setIsPassengerFiltred(false)
    setSearchInput("")
  }
  const passengers = paginate(allPassengers, pageSize, currentPage)

  const filterPassengerByName = () => {
    return allPassengers.filter(handleReGex)
  }

  const showPassengers =
    isPassengerFiltred && !searchDiasbled ? filterPassengerByName() : passengers

  return (
    <div className="my-8 px-4 xl:w-2/3 mx-auto ">
      <h2 className="text-xl mb-2 font-bold"> Liste des passagers</h2>
      <div className=" mb-2 flex gap-2 justify-end">
        {isPassengerFiltred && (
          <button
            onClick={handleDeleteFilter}
            className="bg-red-500 rounded-lg text-gray-50  px-2 bro"
          >
            Delete filter
          </button>
        )}
        <TextInputComponent
          placeholder={"search..."}
          id={"username"}
          type={"text"}
          value={searchInput}
          onSubmit={!isPassengerFiltred && handleSearch}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="" onClick={handleSearch}>
          search
        </button>
      </div>

      {showPassengers.length ? (
        <>
          <List
            passengers={
              isPassengerFiltred
                ? paginate(showPassengers, pageSize, currentPage)
                : passengers
            }
          />
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            count={
              isPassengerFiltred
                ? filterPassengerByName().length
                : allPassengers.length
            }
            onChangePage={setCurrentPage}
          />
        </>
      ) : (
        <p>Aucun passager trouver</p>
      )}
    </div>
  )
}

export default Passengers
