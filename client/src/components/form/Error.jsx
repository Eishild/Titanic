import React from "react"

const Error = (err) => {
  const errorsData = err.err

  return (
    <div>
      {errorsData && (
        <p className="text-red-500">
          {errorsData.map((e) => {
            return e.message
          })}
        </p>
      )}
    </div>
  )
}
export default Error
