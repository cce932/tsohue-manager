import { FETCH_ALL_MEMBERS, FETCH_ALL_EMPLOYEES } from "shared/constants/types"

export const getAllMembers = () => {
  return ({
    type: FETCH_ALL_MEMBERS,
    payload: null,
  })
}

export const getAllEmployees = () => {
  return({
    type: FETCH_ALL_EMPLOYEES,
    payload: null
  })
}