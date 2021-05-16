import {
  CHANGE_EMPLOYEE_ROLE,
  CHANGE_MEMBER_ROLE,
  MODIFY_EMPLOYEE_DATA,
  MODIFY_INGREDIENT_DATA,
  RESET_PWD,
  UPDATE_RECIPE_SUCCESS,
} from "shared/constants/types"
import EditService from "services/edit.service"
import { getAllEmployees, getAllMembers } from "actions/loadData"
import { setMessage } from "./message"
import { extractErrMsg } from "shared/utility/common"
import { allPaths, profile } from "shared/constants/pathname"

export const changeMemberRole = (id, role) => (dispatch) => {
  return EditService.changeMemberRole(id, role).then(
    ({ data }) => {
      dispatch({
        type: CHANGE_MEMBER_ROLE,
        payload: null,
      })
      dispatch(getAllMembers())

      return Promise.resolve(data)
    },
    (error) => {
      const message = extractErrMsg(error)

      dispatch(setMessage({ ...message, id }))

      return Promise.reject(message)
    }
  )
}

export const changeEmployeeRole = (id, role) => (dispatch) => {
  return EditService.changeEmployeeRole(id, role).then(
    ({ data }) => {
      dispatch({
        type: CHANGE_EMPLOYEE_ROLE,
        payload: null,
      })
      dispatch(getAllEmployees())

      return Promise.resolve(data)
    },
    (error) => {
      const message = extractErrMsg(error)

      dispatch(setMessage({ ...message, id }))

      return Promise.reject(message)
    }
  )
}

export const modifyEmployeeData = (id, colName, newValue) => (dispatch) => {
  return EditService.modifyEmployeeData(id, colName, newValue).then(
    ({ data }) => {
      dispatch({
        type: MODIFY_EMPLOYEE_DATA,
        payload: null,
      })
      dispatch(getAllEmployees())

      return Promise.resolve(data)
    },
    (error) => {
      const message = extractErrMsg(error)

      dispatch(setMessage({ ...message, id, colName }))

      return Promise.reject(message)
    }
  )
}

export const resetPwd = (id, newPassword, oldPassword) => (dispatch) => {
  return EditService.resetPwd(id, newPassword, oldPassword).then(
    (response) => {
      dispatch({ type: RESET_PWD, payload: null })
      window.location = allPaths[profile]

      return Promise.resolve(response)
    },
    (error) => {
      dispatch(setMessage(extractErrMsg(error)))
      return Promise.reject(error)
    }
  )
}

export const updateRecipe = (id, recipe) => (dispatch) => {
  return EditService.updateRecipe(id, recipe)
    .then(({ data }) => {
      dispatch({
        type: UPDATE_RECIPE_SUCCESS,
        payload: { id, recipe },
      })

      return Promise.resolve(data.id)
    })
    .catch((error) => {
      // 不能寫.then(success, error => ...)去接error
      // 因為這樣只能接到success這部分處理時的錯誤
      // 而這裡是該接service傳過來的error (此conflict是發生在)
      const message = extractErrMsg(error)
      // dispatch(setMessage(message))
      return Promise.reject(message)
    })
}

export const updateOrderStatus = (id, status) => (dispatch) => {
  return EditService.updateOrderStatus(id, status)
    .then(({ data }) => {
      dispatch({
        type: UPDATE_RECIPE_SUCCESS,
        payload: { id, status },
      })

      return Promise.resolve(data.id)
    })
    .catch((error) => {
      const message = extractErrMsg(error)
      dispatch(message)
      return Promise.reject(message)
    })
}

export const modifyIngredientData = (id, colName, newValue) => (dispatch) => {
  return EditService.modifyIngredientData(id, colName, newValue).then(
    ({ data }) => {
      dispatch({
        type: MODIFY_INGREDIENT_DATA,
        payload: { id, colName, newValue },
      })

      return Promise.resolve(data)
    },
    (error) => {
      const message = extractErrMsg(error)

      dispatch(setMessage({ ...message, id, colName }))

      return Promise.reject(message)
    }
  )
}

export const editRecipeStep = (id, stepData) => (dispatch) => {
  return EditService.editRecipeStep(id, stepData)
    .then(() => Promise.resolve()) // no need to dispatch into reducer, step data is controlled by useState
    .catch((error) => {
      const message = extractErrMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}
