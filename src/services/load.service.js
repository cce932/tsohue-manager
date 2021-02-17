import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"
import { handleErrMsgFromFetch } from "shared/utility/common"

// 抓取每個頁面所需的資料

const getCurrentMemberData = (token = authHeader()) => {
  return axios.get(TS_API + "/employee/me", { headers: token }).then(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(handleErrMsgFromFetch(error))
    }
  )
}

const getAllMembersData = (token = authHeader()) => {
  return axios.get(TS_API + "/member/allMembers", { headers: token }).then(
    (response) => {
      return response.data
    },
    (error) => {
      return Promise.reject(handleErrMsgFromFetch(error))
    }
  )
}

const getAllEmployeesData = (token = authHeader()) => {
  return axios
    .get(TS_API + "/employee/allEmployees", { headers: token })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return Promise.reject(handleErrMsgFromFetch(error))
    })
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getCurrentMemberData,
  getAllMembersData,
  getAllEmployeesData,
}
