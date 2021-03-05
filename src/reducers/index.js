import { combineReducers } from "redux"
import auth from "./auth"
import messages from "./messages"
import members from "./members"
import employees from "./employees"
import ingredients from "./ingredients"
import recipes from "./recipes"

export default combineReducers({
  auth,
  messages,
  members,
  employees,
  ingredients,
  recipes,
})
