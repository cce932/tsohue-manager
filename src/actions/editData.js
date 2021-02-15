import { CHANGE_MEMBER_ROLE } from "shared/constants/types"

export const changeMemberRole = (id, role) => ({
  type: CHANGE_MEMBER_ROLE,
  payload: { id, role },
})
