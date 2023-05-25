import React from "react"

const Filter = ({ filter, setFilter, onClick }) => {
  return (
    <div className="bg-gray-200 flex gap-5 px-4 py-4">
      <div className="">
        <h3 className="font-bold">Genre</h3>
        <div className="flex flex-col">
          <div>
            <label htmlFor="male" className="mr-2">
              Homme
            </label>
            <input
              type="radio"
              id="male"
              name="gender"
              value={"male"}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="female" className="mr-2">
              Femme
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value={"female"}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="age">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          className="w-14"
          value={filter.age}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, age: Number(e.target.value) }))
          }
        />
      </div>
      <div className="">
        <h3 className="font-bold">Survivant</h3>
        <div className="flex flex-col">
          <div>
            <label htmlFor="alive" className="mr-2">
              Oui
            </label>
            <input
              type="radio"
              id="alive"
              name="survived"
              value={1}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  survived: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="not-alive" className="mr-2">
              Non
            </label>
            <input
              type="radio"
              id="not-alive"
              name="survived"
              value={0}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  survived: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
      </div>
      <button
        className="border border-black px-2 h-10 rounded-lg"
        onClick={onClick}
      >
        filtrer
      </button>
    </div>
  )
}

export default Filter
