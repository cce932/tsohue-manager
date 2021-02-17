import {
  FETCH_ALL_EMPLOYEES,
  FETCH_ALL_EMPLOYEES_SUCCESS,
  FETCH_ALL_EMPLOYEES_FAILURE,
  SET_MESSAGE,
} from "shared/constants/types"
import LoadService from "services/load.service"

const fetchAllEmployees = (store) => (next) => (action) => {
  if (action.type === FETCH_ALL_EMPLOYEES) {
    LoadService.getAllEmployeesData().then(
      (data) => {
        store.dispatch({
          type: FETCH_ALL_EMPLOYEES_SUCCESS,
          payload: data,
        })

        return Promise.resolve()
      },
      (error) => {
        store.dispatch({
          type: FETCH_ALL_EMPLOYEES_FAILURE,
          payload: null,
        })

        store.dispatch({
          type: SET_MESSAGE,
          payload: error,
        })

        return Promise.reject(error)
      }
    )
  }
  return next(action)
}

export default fetchAllEmployees
