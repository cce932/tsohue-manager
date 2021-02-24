import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "shared/constants/types"
import AuthService from "services/auth.service"
import { generatePwd, handleErrMsgFromFetch } from "shared/utility/common"
import { getAllEmployees } from "actions/loadData"
import { sendPwdMail, encrypt } from "shared/utility/feature"
import { setMessage } from "./message"

// dispatch(action) 一定要回傳action 內容是type屬性和可省略的payload
export const register = (
  department,
  title,
  account,
  username,
  email,
  phone,
  role,
) => (dispatch) => {
  const password = generatePwd()
  return AuthService.register(
    department,
    title,
    account,
    username,
    email,
    phone,
    role,
    encrypt(password)
  ).then(
    ({ data }) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: null,
      })

      sendPwdMail(email, username, password).catch(
        (error) => dispatch(setMessage('註冊郵件寄送錯誤，請重新註冊。'))
      )

      dispatch(getAllEmployees())

      return Promise.resolve(data)
    },
    (error) => {
      const message = handleErrMsgFromFetch(error)

      dispatch({
        type: REGISTER_FAIL,
        payload: null,
      })

      dispatch(setMessage(error))

      return Promise.reject(message)
    }
  )
}

export const login = (account, password) => (dispatch) => {
  return AuthService.login(account, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      })

      return Promise.resolve()
    },
    (error) => {
      const message = handleErrMsgFromFetch(error)

      dispatch({
        type: LOGIN_FAIL,
        payload: null,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: {
          status: message.status || null,
          message: message.message || null,
          debugMessage: message.debugMessage || null,
        },
      })

      return Promise.reject(message)
    }
  )
}

export const logout = () => (dispatch) => {
  AuthService.logout()

  dispatch({
    type: LOGOUT,
    payload: null,
  })
}
