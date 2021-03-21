import AddService from "services/add.service"
import {
  ADD_INGREDIENT_SUCCESS,
  CREATE_RECIPE_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
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

export const createRecipe = (recipeData) => (dispatch, getState) => {
  const recipesLength = getState().recipes.allRecipes
    ? getState().recipes.allRecipes.lenght
    : undefined

  return AddService.createRecipe(recipeData, recipesLength).then(
    ({ data }) => {
      dispatch({
        type: CREATE_RECIPE_SUCCESS,
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

export const createRecipeIngredient = (
  recipeId,
  ingredientId,
  quantityRequired
) => (dispatch) => {
  return AddService.createRecipeIngredient(
    recipeId,
    ingredientId,
    quantityRequired
  ).then(
    ({ data }) => {
      return Promise.resolve(data)
    },
    (error) => {
      const message = extractErrMsg(error)
      dispatch(setMessage(message))

      return Promise.reject(message)
    }
  )
}

export const uploadRecipeImage = (file, id, onUploadProgress) => (dispatch) => {
  return AddService.uploadRecipeImage(file, id, onUploadProgress).then(
    ({ data }) => {
      dispatch({
        type: UPLOAD_IMAGE_SUCCESS,
        payload: null,
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

export const createRecipeStep = (recipeId, startTime, timer, note) => (
  dispatch
) => {
  return AddService.createRecipeStep(recipeId, startTime, timer, note).then(
    ({ data }) => {
      return Promise.resolve(data)
    },
    (error) => {
      const message = extractErrMsg(error)
      dispatch(setMessage(message))

      return Promise.reject(message)
    }
  )
}
