import { SET_MESSAGE } from "shared/constants/types"
import {
  BAD_REQUEST,
  UNEXPECTED_ERROR,
  TOKEN_EXPIRED,
  EMPTY_TOKEN,
  EDIT_EMPLOYEE_DENIED,
  UNAUTHORIZED,
  LOGIN_FAILURE,
  FORBIDDEN,
  NEED_AUTHORIZATION,
  CONFLICT,
  ACCOUNT_DUPLICATED,
  EMAIL_DUPLICATED,
  RESET_PWD_INCORRECT,
  INGRIDIENT_DUPLICATED,
} from "shared/constants/messages"
import { logout } from "actions/auth"
import color from "shared/style/color"

const employeeColName = {
  title: "職稱",
  department: "部門",
}

const handleErrMessage = (store) => (next) => (action) => {
  if (action.type === SET_MESSAGE) {
    const { payload } = action
    const { status, message, debugMessage } = payload

    switch (status) {
      case BAD_REQUEST:
        if (UNEXPECTED_ERROR.test(message)) {
          if (
            TOKEN_EXPIRED.test(debugMessage) ||
            EMPTY_TOKEN.test(debugMessage)
          ) {
            store.dispatch(logout())
            return
          }
        } else if (EDIT_EMPLOYEE_DENIED.test(message)) {
          return next({
            ...action,
            payload: {
              message: `您沒有權限更新ID:${payload.id}的${
                payload.colName ? employeeColName[payload.colName] : "角色"
              }`,
              color: color.accent,
            },
          })
        } else if (RESET_PWD_INCORRECT.test(message)) {
          return next({
            ...action,
            payload: `舊密碼錯誤囉`,
          })
        }
        break
      case UNAUTHORIZED:
        if (message === LOGIN_FAILURE) {
          return next({
            ...action,
            payload: "帳號或密碼錯誤囉",
          })
        }
        break
      case FORBIDDEN:
        if (message === NEED_AUTHORIZATION) {
          return window.alert("您的權限不足喔")
        }
        break
      case CONFLICT:
        if (ACCOUNT_DUPLICATED.test(debugMessage)) {
          return next({
            ...action,
            payload: {
              message: "換個帳號吧 和別人重複囉",
              color: color.accent,
            },
          })
        } else if (EMAIL_DUPLICATED.test(debugMessage)) {
          return next({
            ...action,
            payload: {
              message: "換一個信箱吧 此信箱已註冊過",
              color: color.accent,
            },
          })
        } else if (INGRIDIENT_DUPLICATED.test(debugMessage)) {
          return window.alert("此食材名稱已經存在囉 請換一個吧")
        }
        break
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
