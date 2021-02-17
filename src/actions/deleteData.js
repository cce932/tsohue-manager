import {
  DELETE_MEMBER,
  DELETE_EMPLOYEE,
} from "shared/constants/types"

export const deleteMember = (id) => ({
  type: DELETE_MEMBER,
  payload: { id },
})

export const deleteEmployee = (id) => ({
  type: DELETE_EMPLOYEE,
  payload: { id },
})
