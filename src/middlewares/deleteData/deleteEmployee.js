import { DELETE_EMPLOYEE } from "shared/constants/types"
import DeleteService from "services/delete.service"

const deleteEmployee = (store) => (next) => (action) => {
  const { type, payload } = action

  if (type === DELETE_EMPLOYEE) {
    new Promise((resolve, reject) => {
      const ids = payload.id

      ids.map((id) =>
        DeleteService.deleteEmployee(id).catch((error) => reject(error))
      )
      resolve()
    }).then(
      () => {
        console.info(`Delete employee ID: ${payload.id} successful`)
        // store.dispatch(getAllEmployees())
        window.location.reload() // 解決刪除後 "清除篩選壞掉"的bug
      },
      (error) =>
        window.alert(
          "刪除員工失敗，請再試一次。" + error && "\n錯誤訊息: " + error
        )
    )
  }
  return next(action)
}

export default deleteEmployee
