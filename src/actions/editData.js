import {
  CHANGE_MEMBER_ROLE,
  MODIFY_EMPLOYEE_DATA,
} from "shared/constants/types"

export const changeMemberRole = (id, role) => ({
  type: CHANGE_MEMBER_ROLE,
  payload: { id, role },
})

export const modifyEmployeeData = (id, colName, newValue) => ({
  type: MODIFY_EMPLOYEE_DATA,
  payload: { id, colName, newValue },
})
