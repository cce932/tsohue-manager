import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"
import logger from "redux-logger"
import handleErrMessage from "middlewares/handleErrMessage"
import fetchAllMemebers from "middlewares/loadData/fetchAllMembers"
import fetchAllEmployees from "middlewares/loadData/fetchAllEmployees"
import deleteMember from "middlewares/deleteData/deleteMember"
import deleteEmployee from "middlewares/deleteData/deleteEmployee"
import changeMemberRole from "middlewares/editData/changeMemberRole"

const middlewares = [
  thunk,
  logger,
  handleErrMessage,
  fetchAllMemebers,
  fetchAllEmployees,
  deleteMember,
  deleteEmployee,
  changeMemberRole
]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
