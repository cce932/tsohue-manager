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

export default {
  addIngredient,
}
