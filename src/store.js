import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"
import logger from "redux-logger"
import handleErrMessage from "middlewares/handleErrMessage"
import fetchAllMemebers from "middlewares/loadData/fetchAllMembers"
import fetchAllEmployees from "middlewares/loadData/fetchAllEmployees"
import changeMemberRole from "middlewares/editData/changeMemberRole"
import modifyEmployeeData from "middlewares/editData/modifyEmployeeData"
import deleteMember from "middlewares/deleteData/deleteMember"
import deleteEmployee from "middlewares/deleteData/deleteEmployee"

const middlewares = [
  thunk,
  logger,
  handleErrMessage,
  fetchAllMemebers,
  fetchAllEmployees,
  changeMemberRole,
  modifyEmployeeData,
  deleteMember,
  deleteEmployee,
]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
