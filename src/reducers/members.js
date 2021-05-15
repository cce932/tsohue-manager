import {
  DELETE_MEMBER,
  FETCH_ALL_MEMBERS,
  FETCH_ALL_MEMBERS_SUCCESS,
} from "shared/constants/types"

const initialState = {}

const members = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_MEMBERS: {
      return {
        ...state,
        fetchTimestamp: new Date(),
      }
    }
    case FETCH_ALL_MEMBERS_SUCCESS:
      return {
        ...state,
        allMembers: payload,
      }
    case DELETE_MEMBER:
      const { id } = payload

      return {
        ...state,
        allMembers: state.allMembers.filter((member) => member.id !== id),
      }
    default:
      return state
  }
}

export default members
