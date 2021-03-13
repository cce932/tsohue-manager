import LoadService from "services/load.service"
import {
  FETCH_ALL_MEMBERS,
  FETCH_ALL_EMPLOYEES,
  FETCH_ALL_INGREDIENTS_SUCCESS,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_RECIPE_BY_ID_SUCCESS,
} from "shared/constants/types"
import { extractErrMsg } from "shared/utility/common"
import { setMessage } from "./message"

export const getAllMembers = () => {
  return {
    type: FETCH_ALL_MEMBERS,
    payload: null,
  }
}

export const getAllEmployees = () => {
  return {
    type: FETCH_ALL_EMPLOYEES,
    payload: null,
  }
}

export const getAllIngredients = () => (dispatch) => {
  return LoadService.getAllIngredientsData().then(
    ({ data }) => {
      dispatch({
        type: FETCH_ALL_INGREDIENTS_SUCCESS,
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

export const getAllRecipes = () => (dispatch, getState) => {
  return LoadService.getAllRecipesData().then(
    ({ data }) => {
      dispatch({
        type: FETCH_ALL_RECIPES_SUCCESS,
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

export const getRecipeById = (id) => (dispatch, getState) => {
  return LoadService.getRecipeById(id).then(
    ({ data }) => {
      dispatch({
        type: FETCH_RECIPE_BY_ID_SUCCESS,
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

// use `getRecipeById` to substitute it now
// export const getImagesByRecipeId = (recipeId) => (dispatch) => {
//   let images = []
//   return LoadService.getImagesByRecipeId(recipeId).then(({data}) => {
//     data.map((image) => {
//       LoadService.getImagefromId(image.id).then(() => {
//         images.push({ ... })
//       })
//     })
//   })
// }

// export const getImagefromId = (id) => (dispatch) => {
//   return LoadService.getImagefromId(id).then(
//     ({ data }) => {
//       // dispatch({ type: FETCH_RECIPE_IMAGE_SUCCESS, payload: data }) // because we don't need to add data to redux state

//       return Promise.resolve(Buffer.from(data, "binary").toString("base64"))
//     },
//     (error) => {
//       const message = extractErrMsg(error)

//       dispatch(setMessage(message))

//       return Promise.reject(message)
//     }
//   )
// }
