import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"
import logger from "redux-logger"
import handleErrMessage from "middlewares/handleErrMessage"
import fetchAllMemebers from "middlewares/loadData/fetchAllMembers"
import changeMemberRole from "middlewares/editData/changeMemberRole"
import deleteMember from "middlewares/deleteData/deleteMember"

const middlewares = [
  thunk,
  logger,
  handleErrMessage,
  fetchAllMemebers,
  changeMemberRole,
  deleteMember,
]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
