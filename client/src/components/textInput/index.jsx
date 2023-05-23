import React from "react"

export default function TextInputComponent({
  id,
  type,
  placeholder,
  onChange,
  hasErrors,
  value,
}) {
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
        onChange={onChange}
      />
    </div>
  )
}
