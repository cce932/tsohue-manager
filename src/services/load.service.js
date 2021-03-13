import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"

// 抓取每個頁面所需的資料

const getCurrentMemberData = (token = authHeader()) => {
  return axios.get(TS_API + "/employee/me", { headers: token })
}

const getAllMembersData = (token = authHeader()) => {
  return axios.get(TS_API + "/member/allMembers", { headers: token })
}

const getAllEmployeesData = (token = authHeader()) => {
  return axios.get(TS_API + "/employee/allEmployees", { headers: token })
}

const getAllIngredientsData = (token = authHeader()) => {
  return axios.get(TS_API + "/ingredient/all", { headers: token })
}

const getAllRecipesData = (token = authHeader()) => {
  return axios.get(TS_API + "/recipe/all", { headers: token })
}

// no need to add token in headers
const getRecipeById = (id) => axios.get(TS_API + "/recipe/" + id)

// use `getRecipeById` to substitute it now
// const getImagesByRecipeId = (id) => {
//   return axios.get(TS_API + "/recipe/images/all/" + id)
// }

// const getImagefromId = (id) =>
//   axios.get(TS_API + "/recipe/images/" + id, { responseType: "arraybuffer" })

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getCurrentMemberData,
  getAllMembersData,
  getAllEmployeesData,
  getAllIngredientsData,
  getAllRecipesData,
  getRecipeById,
}
