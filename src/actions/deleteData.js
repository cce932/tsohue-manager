import DeleteService from "services/delete.service"
import {
  DELETE_MEMBER,
  DELETE_EMPLOYEE,
  DELETE_INGREDIENT_SUCCESS,
} from "shared/constants/types"
import { extractErrMsg } from "shared/utility/common"
import { setMessage } from "actions/message"

export const deleteMember = (id) => ({
  type: DELETE_MEMBER,
  payload: { id },
})

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: { id },
})

export const deleteIngredient = (ids) => (dispatch) => {
  new Promise((resolve, reject) => {
    ids.map((id, index) => {
      DeleteService.deleteIngredient(id).then(
        (res) => {
          dispatch({ type: DELETE_INGREDIENT_SUCCESS, payload: { id } })
        },
        (message) => {
          reject({ message, id })
        }
      )
    })
  }).catch((error) => {
    const message = extractErrMsg(error.message)

    dispatch(setMessage({ ...message, id: error.id }))
  })
}
