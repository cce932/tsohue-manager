import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"

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

const addRecipeImage = (file, id, onUploadProgress, token = authHeader()) => {
  let formData = new FormData()
  formData.append("file", file)

  return axios.post(
    TS_API + "/recipe/images/upload/" + id,
    formData,
    { headers: token, onUploadProgress },
  )
}

export default {
  addIngredient,
  addRecipeImage,
}
