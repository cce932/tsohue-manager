import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"

const changeMemberRole = (id, role, token = authHeader()) => {
  return axios.patch(
    TS_API + "/member/update/role/" + id,
    { role },
    { headers: token }
  )
}

const changeEmployeeRole = (id, role, token = authHeader()) => {
  return axios.patch(
    TS_API + "/employee/update/role/" + id,
    { role },
    { headers: token }
  )
}

const modifyEmployeeData = (id, colName, newValue, token = authHeader()) => {
  let body = JSON.parse(`{"${colName}":"${newValue}"}`)

  return axios.patch(
    TS_API + "/employee/update/data/" + id,
    { ...body },
    { headers: token }
  )
}

const resetPwd = (id, newpassword, prepassword) => {
  const body = {
    newpassword,
    prepassword,
  }

  return axios.patch(
    TS_API + "/employee/update/pwd/" + id,
    { ...body },
    { headers: authHeader() }
  )
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  changeMemberRole,
  changeEmployeeRole,
  modifyEmployeeData,
  resetPwd,
}
