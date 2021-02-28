import {
  FETCH_ALL_MEMBERS,
  FETCH_ALL_MEMBERS_FAILURE,
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
    default:
      return state
  }
}

export default members
