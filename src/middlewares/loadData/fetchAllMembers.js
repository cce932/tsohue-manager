import {
  FETCH_ALL_MEMBERS,
  FETCH_ALL_MEMBERS_SUCCESS,
  FETCH_ALL_MEMBERS_FAILURE,
  SET_MESSAGE,
} from "shared/constants/types"
import LoadService from "services/load.service"
import { handleErrMsgFromFetch } from "shared/utility/common"

const fetchAllMemebers = (store) => (next) => (action) => {
  if (action.type === FETCH_ALL_MEMBERS) {
    LoadService.getAllMembersData().then(
      (data) => {
        store.dispatch({
          type: FETCH_ALL_MEMBERS_SUCCESS,
          payload: data,
        })
        return Promise.resolve()
      },
      (error) => {
        const messge = handleErrMsgFromFetch(error)
        store.dispatch({
          type: FETCH_ALL_MEMBERS_FAILURE,
        })

        store.dispatch({
          type: SET_MESSAGE,
          payload: messge,
        })

        return Promise.reject(messge)
      }
    )
  }
  return next(action)
}

export default fetchAllMemebers