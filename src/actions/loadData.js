import { FETCH_ALL_MEMBERS } from "shared/constants/types"

export const getAllMembers = () => {
  return ({
    type: FETCH_ALL_MEMBERS,
    payload: null,
  })
}
