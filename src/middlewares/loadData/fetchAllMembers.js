import {
  FETCH_ALL_MEMBERS,
  FETCH_ALL_MEMBERS_SUCCESS,
  FETCH_ALL_MEMBERS_FAILURE,
  SET_MESSAGE,
} from "shared/constants/types"
import LoadService from "services/load.service"
import { extractErrMsg } from "shared/utility/common"

const fetchAllMemebers = (store) => (next) => (action) => {
  if (action.type === FETCH_ALL_MEMBERS) {
    LoadService.getAllMembersData().then(
      ({ data }) => {
        store.dispatch({
          type: FETCH_ALL_MEMBERS_SUCCESS,
          payload: data,
        })

        return Promise.resolve()
      },
      (error) => {
        const message = extractErrMsg(error)

        store.dispatch({
          type: FETCH_ALL_MEMBERS_FAILURE,
          payload: null,
        })

        store.dispatch({
          type: SET_MESSAGE,
          payload: message,
        })

        return Promise.reject(message)
      }
    )
  }
  return next(action)
}

export default fetchAllMemebers
