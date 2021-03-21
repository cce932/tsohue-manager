import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"

const deleteMember = async (id, token = authHeader()) =>
  axios.delete(TS_API + "/member/delete/" + id, { headers: token })

const deleteEmployee = async (id, token = authHeader()) =>
  axios.delete(TS_API + "/employee/delete/" + id, { headers: token })

const deleteIngredient = (id, token = authHeader()) =>
  axios.delete(TS_API + "/ingredient/delete/" + id, { headers: token })

const deleteRecipe = (id, token = authHeader()) =>
  axios.delete(TS_API + "/recipe/delete/" + id, { headers: token })

const deleteRecipeImage = (id, token = authHeader()) =>
  axios.delete(TS_API + "/recipe/images/delete/" + id, { headers: token })

const deleteRecipeIngredient = (
  recipeId,
  recipeIngredientId,
  token = authHeader()
) =>
  axios.delete(TS_API + `/recipe/${recipeId}/ingredient/delete/${recipeIngredientId}`, {
    headers: token,
  })

const deleteRecipeStep = (recipeId, recipeStepId, token = authHeader()) =>
  axios.delete(TS_API + `/recipe/${recipeId}/step/delete/${recipeStepId}`, {
    headers: token,
  })

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  deleteMember,
  deleteEmployee,
  deleteIngredient,
  deleteRecipe,
  deleteRecipeImage,
  deleteRecipeIngredient,
  deleteRecipeStep,
}
