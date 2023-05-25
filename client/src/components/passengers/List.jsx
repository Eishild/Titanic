import React from "react"

const List = ({ passengers }) => {
  return (
    <div className="flex-col justify-center text-center">
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-5 border border-black py-2 bg-gray-200">
            <th className="">Numéro</th>
            <th className="">Nom</th>
            <th className="">Age</th>
            <th className="">Sex</th>
            <th className="">Survecue</th>
          </tr>
        </thead>
        <tbody className="">
          {passengers.map((passenger) => (
            <tr
              key={passenger.passengerId}
              className="grid grid-cols-5 border border-black py-4 border-t-0 "
            >
              <td>{passenger.passengerId}</td>
              <td>{passenger.name}</td>
              <td>{passenger.age ? passenger.age : "inconnu"}</td>
              <td>{passenger.sex === "male" ? "Homme" : "Femme"}</td>
              <td>{passenger.survived ? "Oui" : "non"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List
