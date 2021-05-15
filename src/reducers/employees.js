import {
  DELETE_EMPLOYEE,
  FETCH_ALL_EMPLOYEES,
  FETCH_ALL_EMPLOYEES_SUCCESS,
} from "shared/constants/types"

const initialState = {}

const employees = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_EMPLOYEES: {
      return {
        ...state,
        fetchTimestamp: new Date(),
      }
    }
    case FETCH_ALL_EMPLOYEES_SUCCESS:
      return {
        ...state,
        allEmployees: payload,
      }
    case DELETE_EMPLOYEE:
      const { id } = payload

      return {
        ...state,
        allEmployees: state.allEmployees.filter(
          (employee) => employee.id !== id
        ),
      }
    default:
      return state
  }
}

export default employees
