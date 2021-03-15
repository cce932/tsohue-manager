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

// [{ id: 213, name: "dena" }, { id: 10, name: "jerry" }]
// { 213: { name: "dena" }, 10: { name: "jerry" } }
export const extractKeyFromArray = (array, key = "id") => {
  const newObject = {}
  array.map((item) => {
    newObject[item[key]] = { ...item }
    delete newObject[item[key]][key]
  })

  return newObject
}

export const insertIndexToArray = (array) => {
  return array.map((item, index) => {
    return { id: index + 1, ...item }
  })
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

const addPrefix = (string, pad, length) => {
  return (new Array(length + 1).join(pad) + string).slice(-length)
}

export const transSecToMin = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds - minutes * 60
  return addPrefix(minutes, "0", 2) + ":" + addPrefix(seconds, "0", 2)
}
