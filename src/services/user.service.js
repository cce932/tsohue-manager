import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"

// 抓取每個頁面所需的資料

// member基本資料
const getCurrentMemberData = (token = authHeader()) => {
  return axios.get(TS_API + "/employee/me", { headers: token }).then(
    (response) => {
      return response
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      console.error(
        "services/user.service getCurrentMemberData error:\n",
        message
      )
    }
  )
}

const getAllMembersData = (token = authHeader()) => {
  return axios.get(TS_API + "/member/allMembers", { headers: token }).then(
    (response) => {
      return response.data
    },
    (error) => {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString()
      console.error("service/user.service getAllMemberDate error:\n", message)
      return Promise.reject(error)
    }
  )
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getCurrentMemberData,
  getAllMembersData,
}
