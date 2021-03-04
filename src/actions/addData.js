import AddService from "services/add.service"
import {
  ADD_INGREDIENT_SUCCESS,
} from "shared/constants/types"
import { extractErrMsg } from "shared/utility/common"
import { setMessage } from "./message"

export const addIngredient = (
  category,
  name,
  price,
  country,
  city,
  stock,
  safetyStock,
  unit,
  kcal
) => (dispatch) => {
  return AddService.addIngredient(
    category,
    name,
    price,
    country,
    city,
    stock,
    safetyStock,
    unit,
    kcal
  ).then(
    ({ data }) => {
      console.log("add ingredient", data)
      dispatch({
        type: ADD_INGREDIENT_SUCCESS,
        payload: data,
      })

      return data
    },
    (error) => {
      const message = extractErrMsg(error)
      dispatch(setMessage(message))

      return Promise.reject(message)
    }
  )
}
