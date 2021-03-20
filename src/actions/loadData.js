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

export const getImagesByRecipeId = (recipeId) => (dispatch) => {
  let images = []

  return LoadService.getImagesByRecipeId(recipeId).then(({ data }) => {
    let _image = {}

    return Promise.all(
      data.map((image) => {
        return LoadService.getImageByName(image.name)
          .then((res) => {
            _image = {
              picByte: Buffer.from(res.data, "binary").toString("base64"),
              name: image.name,
              id: image.id,
            }
            return _image
          })
          .catch((error) => {
            const message = extractErrMsg(error)

            dispatch(setMessage(message))

            return Promise.reject(message)
          })
      })
    )
  })
}

export const getImagesByName = (images) => (dispatch) => {
  let _image = {}

  return images.map((image) => {
    _image = {}
    LoadService.getImageByName(image.name).then(
      ({ data }) => {
        _image = {
          picByte: Buffer.from(data, "binary").toString("base64"),
          name: image.name,
          id: image.id,
        }
      },
      (error) => {
        const message = extractErrMsg(error)

        dispatch(setMessage(message))

        return Promise.reject(message)
      }
    )
    return Promise.resolve(_image)
  })
}
