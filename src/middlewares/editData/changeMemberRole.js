import { CHANGE_MEMBER_ROLE } from "shared/constants/types"
import EditService from "services/edit.service"
import { getAllMembers } from "actions/loadData"

const changeMemberRole = (store) => (next) => (action) => {
  const { type, payload } = action
  if (type === CHANGE_MEMBER_ROLE) {
    EditService.editMemberRole(payload.id, payload.role).then(() => {
      store.dispatch(getAllMembers())
    })
  }
  return next(action)
}

export default changeMemberRole
