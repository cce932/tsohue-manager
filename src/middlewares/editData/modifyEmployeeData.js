import { MODIFY_EMPLOYEE_DATA } from "shared/constants/types"
import EditService from "services/edit.service"
import { getAllEmployees } from "actions/loadData"

const modifyEmployeeData = (store) => (next) => (action) => {
  const { type, payload } = action

  if (type === MODIFY_EMPLOYEE_DATA) {
    const { id, colName, newValue } = payload
    EditService.modifyEmployeeData(id, colName, newValue).then(
      (response) => {
        store.dispatch(getAllEmployees())
      },
      (error) =>
        window.alert(
          `更新員工ID: ${id}的${colName}為${newValue}發生錯誤，請再試一次。${
            error ? "\n錯誤訊息：" + error : null
          }`
        )
    )
  }
  return next(action)
}

export default modifyEmployeeData
