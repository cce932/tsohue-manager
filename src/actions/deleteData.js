import DeleteService from "services/delete.service"
import {
  DELETE_MEMBER,
  DELETE_EMPLOYEE,
  DELETE_INGREDIENT_SUCCESS,
} from "shared/constants/types"

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
    ids.map((id) =>
      DeleteService.deleteIngredient(id).catch((error) => reject(error))
    )
    resolve()
  }).then(
    () => {
      dispatch({ type: DELETE_INGREDIENT_SUCCESS, payload: {id: ids} })
    },
    (error) =>
      alert("刪除食材失敗，請再試一次。", error && "\n錯誤訊息: " + error)
  )
}
