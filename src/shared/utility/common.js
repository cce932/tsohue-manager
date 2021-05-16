import _ from "lodash"
import moment from "moment"

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

  array.forEach((item) => {
    newObject[item[key]] = { ...item }
    delete newObject[item[key]][key]
  })

  return newObject
}

export const insertIndexToArray = (array) =>
  array.map((item, index) => ({ index: index + 1, ...item }))

export const countSelectedId = (rows, isSelect, selectedList) => {
  let processedList = selectedList

  rows.forEach((row) => {
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

export const transMSecToMin = (totalMSec) =>
  moment(totalMSec, "x").format("mm:ss")

// time = "01:00" transform to "60000"
export const transMinToMSec = (time) =>
  moment(time, "mm:ss").valueOf() - moment("00:00", "mm:ss").valueOf()

// 把array以maxRow為限制 分為多維陣列
export const splitToRows = (array, maxRow) => {
  const result = []
  for (const [index, value] of array.entries()) {
    let group = Math.floor(index / maxRow)
    result[group] ? result[group].push(value) : (result[group] = [value]) // 最後的[item] 注意方括號 不然會出現This method ".push" is not define        return null
  }

  return result
}
