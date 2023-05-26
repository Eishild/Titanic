import React from "react"
import { range } from "lodash"

const Pagination = ({ currentPage, pageSize, count, onChangePage }) => {
  const pages = count / pageSize
  const pagesArray = range(pages)
  return (
    <div className="flex gap-5 justify-end mt-2">
      <nav aria-label="Page navigation example">
        <ul className="flex flex-wrap">
          {pagesArray.map((page) => (
            <li
              key={page}
              className={`h-9 w-9 border-sky-500 border flex items-center justify-center cursor-pointer 
              ${page === currentPage && "bg-sky-500 text-white"}`}
              onClick={() => onChangePage(page)}
            >
              {page + 1}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
