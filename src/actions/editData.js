import {
  CHANGE_EMPLOYEE_ROLE,
  CHANGE_MEMBER_ROLE,
  MODIFY_EMPLOYEE_DATA,
  RESET_PWD,
} from "shared/constants/types"
import EditService from "services/edit.service"
import { getAllEmployees } from "actions/loadData"
import { setMessage } from "./message"
import { extractErrMsg } from "shared/utility/common"

export const changeMemberRole = (id, role) => ({
  type: CHANGE_MEMBER_ROLE,
  payload: { id, role },
})

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
      window.location = "/profile"

      return Promise.resolve(response)
    },
    (error) => {
      dispatch(setMessage(extractErrMsg(error)))
      return Promise.reject(error)
    }
  )
}
