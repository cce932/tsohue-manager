import { SET_MESSAGE } from "shared/constants/types"
import {
  BAD_REQUEST,
  UNEXPECTED_ERROR,
  TOKEN_EXPIRED,
  EMPTY_TOKEN,
  UNAUTHORIZED,
  LOGIN_FAILURE,
  FORBIDDEN,
  NEED_AUTHORIZATION,
  CONFLICT,
  ACCOUNT_DUPLICATED,
  EMAIL_DUPLICATED,
} from "shared/constants/messages"
import { logout } from "actions/auth"

const handleErrMessage = (store) => (next) => (action) => {
  if (action.type === SET_MESSAGE) {
    const { payload } = action
    const { status, message, debugMessage } = payload

    switch (status) {
      case BAD_REQUEST:
        if (message === UNEXPECTED_ERROR) {
          if (
            TOKEN_EXPIRED.test(debugMessage) ||
            EMPTY_TOKEN.test(debugMessage)
          ) {
            store.dispatch(logout())
            window.location.replace("/login")
            window.alert("請重新登入喔")
            return
          }
        }
      case UNAUTHORIZED:
        if (message === LOGIN_FAILURE) {
          return next({
            ...action,
            payload: "帳號或密碼錯誤囉",
          })
        }
      case FORBIDDEN:
        if (message === NEED_AUTHORIZATION) {
          return window.alert("您的權限不足喔")
        }
      case CONFLICT:
        if (ACCOUNT_DUPLICATED.test(debugMessage)) {
          return next({
            ...action,
            payload: "換個帳號吧 和別人重複囉",
          })
        } else if (EMAIL_DUPLICATED.test(debugMessage)) {
          return next({
            ...action,
            payload: "換一個信箱吧 此信箱已註冊過",
          })
        }
      default:
        if (status && message && debugMessage) {
          return window.alert(
            "未知錯誤！！\nstatus:" +
              status +
              "\nmessage:" +
              message +
              "\ndebugMessage: " +
              debugMessage
          )
        } else {
          return window.alert("未知錯誤！！\n" + payload)
        }
    }
  } else {
    return next(action)
  }
}
export default handleErrMessage
