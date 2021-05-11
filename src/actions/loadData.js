import loadService from "services/load.service"
import LoadService from "services/load.service"
import {
  FETCH_CURRENT_EMPLOYEE,
  FETCH_ALL_MEMBERS,
  FETCH_ALL_EMPLOYEES,
  FETCH_ALL_INGREDIENTS_SUCCESS,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_RECIPE_BY_ID_SUCCESS,
  FETCH_ALL_ORDERS_SUCCESS,
} from "shared/constants/types"
import { extractErrMsg } from "shared/utility/common"
import { logout } from "./auth"
import { setMessage } from "./message"

export const getCurrentEmployee = (token) => (dispatch) => {
  // validate wheather the user has loggedin or not when landing the site
  loadService
    .getCurrentEmployee({ Authorization: token })
    .then(({ data }) => {
      dispatch({
        type: FETCH_CURRENT_EMPLOYEE,
        payload: data,
      })
    })
    .catch(() => dispatch(logout()))
}

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

export const getAllOrders = () => (dispatch) => {
  return LoadService.getAllOrdersData().then(
    ({ data }) => {
      dispatch({
        type: FETCH_ALL_ORDERS_SUCCESS,
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

export const getVersionAndRecipeById = (id) => (dispatch) => {
  return LoadService.getVersionAndRecipeById(id).then(
    ({ data }) => Promise.resolve(data),
    (error) => {
      const message = extractErrMsg(error)

      dispatch(setMessage(message))

      return Promise.reject(message)
    }
  )
}

export const getImagesByRecipeId = (recipeId) => (dispatch) => {
  return LoadService.getImagesByRecipeId(recipeId).then(({ data }) => {
    let _image = {}
    return Promise.all(
      data.map((image) => {
        return LoadService.getImageById(image.id)
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
