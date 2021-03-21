import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"
import _ from "lodash"

const addIngredient = (
  category,
  name,
  price,
  country,
  city,
  stock,
  safetyStock,
  unit,
  kcal,
  token = authHeader()
) => {
  return axios.post(
    TS_API + "/ingredient/create",
    {
      category,
      name,
      price,
      country,
      city,
      stock,
      safetyStock,
      unit,
      kcal,
    },
    { headers: token }
  )
}

const createRecipe = (recipeData = {}, recipesLength, token = authHeader()) => {
  const emptyRecipe = {
    name: `食譜 - ${recipesLength}`,
    version: "NORMAL",
    link: "",
    description: "",
    price: 0,
    recipeSteps: [],
    recipeIngredients: [],
  }

  return axios.post(
    TS_API + "/recipe/create",
    _.isEmpty(recipeData) ? emptyRecipe : recipeData,
    {
      headers: token,
    }
  )
}

const createRecipeIngredient = (
  recipeId,
  ingredientId,
  quantityRequired,
  token = authHeader()
) =>
  axios.post(
    TS_API + `/recipe/${recipeId}/ingredient/create`,
    {
      ingredient: { id: ingredientId },
      quantityRequired,
    },
    {
      headers: token,
    }
  )

const uploadRecipeImage = (
  file,
  id,
  onUploadProgress,
  token = authHeader()
) => {
  let formData = new FormData()
  formData.append("file", file)
  return axios.post(TS_API + "/recipe/images/upload/blob/" + id, formData, {
    headers: token,
    onUploadProgress,
  })
}

const createRecipeStep = (
  recipeId,
  startTime,
  timer,
  note,
  token = authHeader()
) =>
  axios.post(
    TS_API + `/recipe/${recipeId}/step/create`,
    { startTime, timer, note },
    { headers: token }
  )

export default {
  addIngredient,
  createRecipe,
  uploadRecipeImage,
  createRecipeIngredient,
  createRecipeStep,
}
