import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"
import { handleErrMsgFromFetch } from "shared/utility/common"

const deleteMember = async (ids, token = authHeader()) =>
  axios.delete(TS_API + "/member/delete/" + ids, { headers: token }).then(
    (response) => Promise.resolve(response),
    (error) => Promise.reject(handleErrMsgFromFetch(error))
  )

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  deleteMember,
}
