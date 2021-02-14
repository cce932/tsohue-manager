import {
  FETCH_ALL_MEMBERS,
  FETCH_ALL_MEMBERS_SUCCESS,
  FETCH_ALL_MEMBERS_FAILURE,
  SET_MESSAGE,
} from "shared/constants/types"
import UserService from "services/user.service"

const fetchAllMemebers = (store) => (next) => (action) => {
  console.log("middle getAllMemebers", action)
  if (action.type === FETCH_ALL_MEMBERS) {
    UserService.getAllMembersData().then(
      (data) => {
        store.dispatch({
          type: FETCH_ALL_MEMBERS_SUCCESS,
          payload: data,
        })
        return Promise.resolve()
      },
      (error) => {
        const message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()

        store.dispatch({
          type: FETCH_ALL_MEMBERS_FAILURE,
        })

        store.dispatch({
          type: SET_MESSAGE,
          payload: message,
        })

        return Promise.reject()
      }
    )
  }
  return next(action)
}

export default fetchAllMemebers
