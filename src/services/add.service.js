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

const createRecipe = (token = authHeader()) => {
  const emptyRecipe = {
    name: "creating",
    link: "",
    description: "",
    recipeSteps: [],
    recipeIngredients: [],
  }
  return axios.post(TS_API + "/recipe/create", emptyRecipe, {
    headers: token,
  })
}

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
