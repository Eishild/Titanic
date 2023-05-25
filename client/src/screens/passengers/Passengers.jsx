import React, { useEffect, useState } from "react"
import apiService from "../../services"
import TextInputComponent from "../../components/textInput"
import Filter from "../../components/filter/Filter"
import List from "../../components/passengers/List"
import Pagination from "../../components/passengers/Pagination"
import { paginate } from "../../tools/paginate"

const Passengers = () => {
  const [allPassengers, setAllPassengers] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const [isPassengerFiltred, setIsPassengerFiltred] = useState(false)
  const [deleteFilter, setDeleteFilter] = useState(false)

  useEffect(() => {
    const fetchPassengers = async () => {
      const getAllPassengers = await apiService.getAllPassengers()
      setAllPassengers(getAllPassengers.data.value)
    }
    fetchPassengers()
  }, [])

  const handleReGex = (data) => new RegExp(searchInput, "i").test(data.name)

  const handleSearch = () => {
    setIsPassengerFiltred(true)
    setDeleteFilter(true)
  }

  const handleDeleteFilter = () => {
    setIsPassengerFiltred(false)
    setDeleteFilter(false)
    setSearchInput("")
  }
  const passengers = paginate(allPassengers, pageSize, currentPage)

  const filterPassengerByName = () => {
    const passengerFiltred = allPassengers.filter(handleReGex)
    const updatePaginate = paginate(passengerFiltred, pageSize, currentPage)
    return updatePaginate
  }

  const showPassengers = isPassengerFiltred
    ? filterPassengerByName()
    : passengers
  return (
    <div className="my-8 w-2/3 mx-auto ">
      <h2 className="text-xl mb-2 font-bold"> Liste des passagers</h2>
      <div className=" mb-2 flex gap-2 justify-end">
        {deleteFilter && (
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
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="" onClick={handleSearch}>
          search
        </button>
      </div>

      {showPassengers.length ? (
        <>
          <List passengers={showPassengers} />
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            count={allPassengers.length}
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
