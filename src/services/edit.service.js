import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"
import { extractErrMsg } from "shared/utility/common"

const changeMemberRole = (id, role, token = authHeader()) => {
  return axios
    .patch(TS_API + "/member/update/role/" + id, { role }, { headers: token })
    .then(
      (response) => {
        return Promise.resolve(response)
      },
      (error) => {
        return Promise.reject(extractErrMsg(error))
      }
    )
}

const changeEmployeeRole = (id, role, token = authHeader()) => {
  return axios
    .patch(TS_API + "/employee/update/role/" + id, { role }, { headers: token })
    .then(
      (response) => {
        return Promise.resolve(response)
      },
      (error) => {
        return Promise.reject(extractErrMsg(error))
      }
    )
}

const modifyEmployeeData = (id, colName, newValue, token = authHeader()) => {
  let body = JSON.parse(`{"${colName}":"${newValue}"}`)

  return axios
    .patch(
      TS_API + "/employee/update/data/" + id,
      { ...body },
      { headers: token }
    )
    .then(
      (response) => {
        return Promise.resolve(response)
      },
      (error) => {
        return Promise.reject(extractErrMsg(error))
      }
    )
}

const resetPwd = (id, newpassword, prepassword) => {
  const body = {
    newpassword,
    prepassword,
  }

  return axios
    .patch(
      TS_API + "/employee/update/pwd/" + id,
      { ...body },
      { headers: authHeader() }
    )
    .then(
      (response) => {
        return Promise.resolve(response)
      },
      (error) => {
        return Promise.reject(extractErrMsg(error))
      }
    )
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  changeMemberRole,
  changeEmployeeRole,
  modifyEmployeeData,
  resetPwd,
}
