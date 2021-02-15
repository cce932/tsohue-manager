import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"
import { handleErrMsgFromFetch } from "shared/utility/common"

const editMemberRole = (id, role, token = authHeader()) => {
  return axios
    .patch(TS_API + "/member/update/role/" + id, { role }, { headers: token })
    .then(
      (response) => {
        return Promise.resolve()
      },
      (error) => {
        return Promise.reject(handleErrMsgFromFetch(error))
      }
    )
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  editMemberRole,
}
