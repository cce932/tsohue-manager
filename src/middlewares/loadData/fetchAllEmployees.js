import {
  FETCH_ALL_EMPLOYEES,
  FETCH_ALL_EMPLOYEES_SUCCESS,
  FETCH_ALL_EMPLOYEES_FAILURE,
  SET_MESSAGE,
} from "shared/constants/types"
import LoadService from "services/load.service"
import { extractErrMsg } from "shared/utility/common"

const fetchAllEmployees = (store) => (next) => (action) => {
  if (action.type === FETCH_ALL_EMPLOYEES) {
    LoadService.getAllEmployeesData().then(
      ({ data }) => {
        store.dispatch({
          type: FETCH_ALL_EMPLOYEES_SUCCESS,
          payload: data,
        })

        return Promise.resolve()
      },
      (error) => {
        const message = extractErrMsg(error)

        store.dispatch({
          type: FETCH_ALL_EMPLOYEES_FAILURE,
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

export default fetchAllEmployees
