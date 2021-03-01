import loadService from "services/load.service"
import {
  FETCH_ALL_MEMBERS,
  FETCH_ALL_EMPLOYEES,
  FETCH_ALL_INGREDIENTS_SUCCESS,
} from "shared/constants/types"
import { extractErrMsg } from "shared/utility/common"
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
    ({ data }) => {
      dispatch({
        type: FETCH_ALL_INGREDIENTS_SUCCESS,
        payload: data,
      })

      return Promise.resolve(data)
    },
    (error) => {
      const message = extractErrMsg(error)

      dispatch(setMessage(message))

      return Promise.reject(message)
    }
  )
}
