export const getMeunName = (allPaths, nowAt) => {
  return Object.keys(allPaths).find((path) => allPaths[path] === nowAt)
}

export const extractErrMsg = (error) => {
  const message =
    (error.response && error.response.data) || // data 內有 status, message, debugMessage, timestamp
    error.message || // Request failed with status code 401
    error.toString() // Error: Request failed with status code 401

  console.error("extractErrMsg", message)
  return message
}

export const countSelectedId = (rows, isSelect, selectedList) => {
  let processedList = selectedList
  rows.map((row) => {
    processedList = isSelect
      ? processedList.concat(row.id)
      : processedList.filter((selected) => selected !== row.id)
  })
  return processedList
}

const keylist = "abcdefghijklmnopqrstuvwxyz123456789"

export const generatePwd = (length = 8) => {
  let temp = ""
  for (let i = 0; i < length; i++)
    temp += keylist.charAt(Math.floor(Math.random() * keylist.length))
  return temp
}
