export function paginate(items, pageSize, currentPage) {
  const startIdx = currentPage * pageSize

  return items.slice(startIdx, startIdx + pageSize)
}
