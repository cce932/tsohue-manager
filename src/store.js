import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"
import logger from "redux-logger"
import { handleErrMessage } from "middlewares"

const middlewares = [thunk, logger, handleErrMessage]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
