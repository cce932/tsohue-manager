import axios from "axios"
import authHeader from "./auth-header"
import { TS_API } from "shared/constants/urls"

const deleteMember = async (id, token = authHeader()) =>
  axios.delete(TS_API + "/member/delete/" + id, { headers: token })

const deleteEmployee = async (id, token = authHeader()) =>
  axios.delete(TS_API + "/employee/delete/" + id, { headers: token })

const deleteIngredient = async (id, token = authHeader()) =>
  axios.delete(TS_API + "/ingredient/delete/" + id, { headers: token })

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  deleteMember,
  deleteEmployee,
  deleteIngredient,
}
