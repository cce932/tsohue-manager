import loadService from "services/load.service"
import {
  FETCH_ALL_MEMBERS,
  FETCH_ALL_EMPLOYEES,
  FETCH_ALL_INGREDIENTS_SUCCESS,
} from "shared/constants/types"
import { setMessage } from "./message"

export const getAllMembers = () => {
  return {
    type: FETCH_ALL_MEMBERS,
    payload: null,
  }
}

export const getAllEmployees = () => {
  return {
    type: FETCH_ALL_EMPLOYEES,
    payload: null,
  }
}

export const getAllIngredients = () => (dispatch) => {
  return loadService.getAllIngredientsData().then(
    (response) => {
      dispatch({
        type: FETCH_ALL_INGREDIENTS_SUCCESS,
        payload: response,
      })

      return Promise.resolve(response)
    },
    (error) => {
      dispatch(setMessage(error))

      return Promise.reject(error)
    }
  )
}
