import { CHANGE_MEMBER_ROLE, DELETE_MEMBER } from "shared/constants/types"

export const changeMemberRole = (id, role) => ({
  type: CHANGE_MEMBER_ROLE,
  payload: { id, role },
})

export const deleteMember = (id) => ({
  type: DELETE_MEMBER,
  payload: { id },
})
