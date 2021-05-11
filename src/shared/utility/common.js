import _ from "lodash"

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
    return { index: index + 1, ...item }
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
    temp += keylist.charAt(_.floor(_.random() * keylist.length))
  return temp
}

const addPrefix = (string, pad, length) => {
  return (new Array(length + 1).join(pad) + string).slice(-length)
}

export const transMSecToMin = (totalMSec) => {
  const totalSec = _.floor(totalMSec / 1000)
  const minutes = _.floor(totalSec / 60)
  const seconds = totalSec - minutes * 60
  return addPrefix(minutes, "0", 2) + ":" + addPrefix(seconds, "0", 2)
}

// 把array以maxRow為限制 分為多維陣列
export const splitToRows = (array, maxRow) => {
  const result = []
  for (const [index, value] of array.entries()) {
    let group = Math.floor(index / maxRow)
    result[group] ? result[group].push(value) : (result[group] = [value]) // 最後的[item] 注意方括號 不然會出現This method ".push" is not define        return null
  }

  return result
}
