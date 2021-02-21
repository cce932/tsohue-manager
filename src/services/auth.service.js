import axios from "axios"
import { TS_API } from "shared/constants/urls"
import LoadService from "./load.service"
import authHeader from "./auth-header"

const register = (
  department,
  title,
  account,
  username,
  email,
  phone,
  role,
  token = authHeader()
) => {
  console.log("tokeninregister", token)
  const password = "444"
  return axios.post(
    TS_API + "/employee/register",
    {
      department,
      title,
      account,
      username,
      email,
      phone,
      role,
      password,
    },
    { headers: token }
  )
}

const login = (account, password) => {
  return axios
    .post(TS_API + "/login", {
      account,
      password,
    })
    .then(async (response) => {
      let allResponse = { ...response.data }

      if (response.data.token) {
        const header = { Authorization: response.data.token } // Authorization 名稱不可改動
        const memberData = await LoadService.getCurrentMemberData(header) // 如果沒加await 就會直接return 不等getCurrentMemberData

        allResponse = {
          ...allResponse,
          ...memberData.data,
        }
      }
      localStorage.setItem("user", JSON.stringify(allResponse))

      return allResponse
    })
}

const logout = () => {
  localStorage.removeItem("user")
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  register,
  login,
  logout,
}
