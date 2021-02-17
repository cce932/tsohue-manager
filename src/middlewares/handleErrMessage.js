import { SET_MESSAGE } from "shared/constants/types"
import {
  UNEXPECTED_ERROR,
  LOGIN_FAILURE,
  NEED_AUTHORIZATION,
  ACCOUNT_DUPLICATED,
  TOKEN_EXPIRED,
  EMPTY_TOKEN,
} from "shared/constants/messages"

const handleErrMessage = (store) => (next) => (action) => {
  if (action.type === SET_MESSAGE) {
    const { type, payload } = action
    const { status, message, debugMessage } = payload

    switch (payload.message) {
      case UNEXPECTED_ERROR:
        if (
          TOKEN_EXPIRED.test(debugMessage) ||
          EMPTY_TOKEN.test(debugMessage)
        ) {
          return window.alert("請重新登入喔")
        } else {
          return window.alert(
            "錯誤\nmessage:" + message + "\ndebugMessage: " + debugMessage
          )
        }
      case LOGIN_FAILURE:
        return next({
          ...action,
          payload: "帳號或密碼錯誤囉",
        })
      case NEED_AUTHORIZATION:
        return window.alert("您的權限不足喔")
      case ACCOUNT_DUPLICATED:
        return next({
          ...action,
          payload: "帳號和其他人尬作伙囉",
        })
    }
  } else {
    return next(action)
  }
}
export default handleErrMessage
