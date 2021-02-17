import { CHANGE_MEMBER_ROLE } from "shared/constants/types"
import EditService from "services/edit.service"
import { getAllMembers } from "actions/loadData"

const changeMemberRole = (store) => (next) => (action) => {
  const { type, payload } = action
  if (type === CHANGE_MEMBER_ROLE) {
    EditService.changeMemberRole(payload.id, payload.role).then(
      () => store.dispatch(getAllMembers()),
      (error) =>
        window.alert(
          `更新會員資格失敗，請再試一次。` + error && `錯誤訊息：` + error
        )
    )
  }
  return next(action)
}

export default changeMemberRole
