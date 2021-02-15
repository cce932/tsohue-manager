export const getMeunName = (allPaths, nowAt) => {
  return Object.keys(allPaths).find((path) => allPaths[path] === nowAt)
}

export const handleErrMsgFromFetch = (error) => {
  const message =
    (error.response && error.response.data) || // data 內有 status, message, debugMessage, timestamp
    error.message || // Request failed with status code 401
    error.toString() // Error: Request failed with status code 401

  console.error(message)
  return message
}
