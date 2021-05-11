import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "shared/constants/types"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null }

const auth = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    default:
      // 之所以會在點login後 閃過一下設定的state又消失 是redux內部有dispatch action 好像是把localStorage的設定值放到state
      return state
  }
}

export default auth
