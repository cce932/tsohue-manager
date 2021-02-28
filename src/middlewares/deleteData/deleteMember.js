import { DELETE_MEMBER } from "shared/constants/types"
import DeleteService from "services/delete.service"

const deleteMember = (store) => (next) => (action) => {
  const { type, payload } = action
  if (type === DELETE_MEMBER) {
    new Promise((resolve, reject) => {
      const ids = payload.id

      ids.map((id) =>
        DeleteService.deleteMember(id).catch((error) => reject(error))
      )
      resolve() // 所有都delete之後才resolve
    }).then(
      () => {
        console.info(`Delete member ID: ${payload.id} successful`)
        // store.dispatch(getAllMembers())
        window.location.reload() // 解決刪除後 "清除篩選壞掉"的bug
      },
      (error) =>
        alert("刪除會員失敗，請再試一次。", error && "\n錯誤訊息: " + error)
    )
  }
  return next(action)
}

export default deleteMember
