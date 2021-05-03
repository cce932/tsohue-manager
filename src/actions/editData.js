import {
  CHANGE_EMPLOYEE_ROLE,
  MODIFY_EMPLOYEE_DATA,
  RESET_PWD,
  UPDATE_RECIPE_SUCCESS,
} from "shared/constants/types"
import EditService from "services/edit.service"
import { getAllEmployees } from "actions/loadData"
import { setMessage } from "./message"
import { extractErrMsg } from "shared/utility/common"
import { allPaths, profile } from "shared/constants/pathname"

export const changeMemberRole = (id, role) =>
  EditService.changeMemberRole(id, role)

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

      return Promise.reject(error)
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

      return Promise.reject(error)
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
