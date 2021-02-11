export const getMeunName = (allPaths, nowAt) => {
  return Object.keys(allPaths).find((path) => allPaths[path] === nowAt)
}
