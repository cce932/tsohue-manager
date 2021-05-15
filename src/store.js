import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"
import logger from "redux-logger"
import handleErrMessage from "middlewares/handleErrMessage"
import fetchAllMemebers from "middlewares/loadData/fetchAllMembers"
import fetchAllEmployees from "middlewares/loadData/fetchAllEmployees"

const middlewares = [
  thunk,
  logger,
  handleErrMessage,
  fetchAllMemebers,
  fetchAllEmployees,
]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
