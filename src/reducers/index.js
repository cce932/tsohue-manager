import { combineReducers } from "redux"
import auth from "./auth"
import messages from "./messages"
import members from "./members"
import orders from "./orders"
import employees from "./employees"
import ingredients from "./ingredients"
import recipes from "./recipes"

export default combineReducers({
  auth,
  messages,
  members,
  orders,
  employees,
  ingredients,
  recipes,
})
