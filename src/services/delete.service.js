import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"
import { extractErrMsg } from "shared/utility/common"

const deleteMember = async (id, token = authHeader()) =>
  axios.delete(TS_API + "/member/delete/" + id, { headers: token }).then(
    (response) => Promise.resolve(response),
    (error) => Promise.reject(extractErrMsg(error))
  )

const deleteEmployee = async (id, token = authHeader()) =>
  axios.delete(TS_API + "/employee/delete/" + id, { headers: token }).then(
    (response) => Promise.resolve(response),
    (error) => Promise.reject(extractErrMsg(error))
  )

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  deleteMember,
  deleteEmployee,
}
