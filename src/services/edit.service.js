import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"
import { handleErrMsgFromFetch } from "shared/utility/common"

const changeMemberRole = (id, role, token = authHeader()) => {
  return axios
    .patch(TS_API + "/member/update/role/" + id, { role }, { headers: token })
    .then(
      (response) => {
        return Promise.resolve(response)
      },
      (error) => {
        return Promise.reject(handleErrMsgFromFetch(error))
      }
    )
}

const modifyEmployeeData = (id, colName, newValue, token = authHeader()) => {
  let body = JSON.parse(`{"${colName}":"${newValue}"}`)

  return axios
    .patch(TS_API + "/employee/update/" + id, { ...body }, { headers: token })
    .then(
      (response) => {
        return Promise.resolve(response)
      },
      (error) => {
        return Promise.reject(handleErrMsgFromFetch(error))
      }
    )
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  changeMemberRole,
  modifyEmployeeData,
}
