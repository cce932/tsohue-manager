import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "shared/constants/types"
import AuthService from "services/auth.service"
import { handleErrMsgFromFetch } from "shared/utility/common"

// dispatch(action) 一定要回傳action 內容是type屬性和可省略的payload
export const register = (
  department,
  title,
  account,
  username,
  email,
  phone,
  role
) => (dispatch) =>
    AuthService.register(
      department,
      title,
      account,
      username,
      email,
      phone,
      role
    ).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: null,
        })

        return Promise.resolve()
      },
      (error) => {
        const message = handleErrMsgFromFetch(error)

        dispatch({
          type: REGISTER_FAIL,
          payload: null,
        })

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        })

        return Promise.reject(message)
      }
    )

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
