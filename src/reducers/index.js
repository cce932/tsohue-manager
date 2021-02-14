import { combineReducers } from "redux"
import auth from "./auth"
import messages from "./messages"
import members from "./members"

export default combineReducers({
  auth,
  messages,
  members,
})
