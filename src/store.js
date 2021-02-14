import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"
import logger from "redux-logger"
import handleErrMessage from "middlewares/handleErrMessage"
import fetchAllMemebers from "middlewares/fetchData/fetchAllMembers"

const middlewares = [
  thunk,
  logger,
  handleErrMessage,
  fetchAllMemebers,
]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
