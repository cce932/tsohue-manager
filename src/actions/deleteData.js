import DeleteService from "services/delete.service"
import {
  DELETE_MEMBER,
  DELETE_EMPLOYEE,
  DELETE_INGREDIENT_SUCCESS,
  DELETE_RECIPES_SUCCESS,
} from "shared/constants/types"
import { extractErrMsg } from "shared/utility/common"
import { setMessage } from "actions/message"

export const deleteMember = (ids) => (dispatch) =>
  Promise.all(
    ids.map((id) =>
      DeleteService.deleteMember(id).then(({ data }) =>
        dispatch({ type: DELETE_MEMBER, payload: { id: data.id } })
      )
    )
  )

export const deleteEmployee = (ids) => (dispatch) =>
  Promise.all(
    ids.map((id) =>
      DeleteService.deleteEmployee(id).then(({ data }) =>
        dispatch({ type: DELETE_EMPLOYEE, payload: { id: data.id } })
      )
    )
  )

export const deleteIngredient = (ids) => (dispatch) =>
  Promise.all(
    ids.map((id) =>
      DeleteService.deleteIngredient(id).then(({ data }) =>
        dispatch({ type: DELETE_INGREDIENT_SUCCESS, payload: { id: data.id } })
      )
    )
  ).catch((error) => Promise.reject(extractErrMsg(error)))

export const deleteRecipe = (ids) => (dispatch) =>
  Promise.all(
    ids.map((id) =>
      DeleteService.deleteRecipe(id).then(({ data }) =>
        dispatch({ type: DELETE_RECIPES_SUCCESS, payload: { id: data.id } })
      )
    )
  )

export const deleteRecipeIngredient =
  (recipeId, recipeIngredientId) => (dispatch) => {
    return DeleteService.deleteRecipeIngredient(
      recipeId,
      recipeIngredientId
    ).then(
      ({ data }) => Promise.resolve(data),
      (error) => {
        const message = extractErrMsg(error)

        dispatch(setMessage({ ...message }))
        return Promise.reject()
      }
    )
  }

export const deleteRecipeImage = (id) => (dispatch) => {
  return DeleteService.deleteRecipeImage(id).catch((error) => {
    const message = extractErrMsg(error)

    dispatch(setMessage({ ...message }))
    return Promise.reject()
  })
}

export const deleteRecipeStep = (recipeId, stepId) => (dispatch) => {
  return DeleteService.deleteRecipeStep(recipeId, stepId).then(
    ({ data }) => Promise.resolve(data),
    (error) => {
      const message = extractErrMsg(error)

      dispatch(setMessage({ ...message }))
      return Promise.reject()
    }
  )
}
