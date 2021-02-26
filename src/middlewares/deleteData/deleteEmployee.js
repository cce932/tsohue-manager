import { DELETE_EMPLOYEE } from "shared/constants/types"
import DeleteService from "services/delete.service"

const deleteEmployee = (store) => (next) => (action) => {
  const { type, payload } = action

  if (type === DELETE_EMPLOYEE) {
    new Promise((resolve, reject) => {
      if (payload.id.length > 1) {
        const ids = payload.id

        ids.map((id, index) =>
          DeleteService.deleteEmployee(id)
            .then(() => {
              index === ids.length - 1 && resolve() // (待改善) 要等選取的多個id都delted 才該去getAllMember 理想上要用await
            })
            .catch((error) => reject(error))
        )
      } else {
        DeleteService.deleteEmployee(payload.id)
          .then(() => resolve())
          .catch((error) => reject(error))
      }
    }).then(
      (response) => {
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
