import React from "react"

export default function TextInputComponent({
  id,
  type,
  placeholder,
  onChange,
  hasErrors,
  onSubmit,
  value,
}) {
  const handleKeyDown = (code) => {
    if (code === "Enter") {
      return onSubmit()
    }
    return null
  }
  return (
    <div>
      <input
        className={`shadow appearance-none ${
          hasErrors?.length ? "border-red-500" : "border-black"
        } border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onKeyDown={(event) => handleKeyDown(event.code)}
        onChange={onChange}
      />
    </div>
  )
}
