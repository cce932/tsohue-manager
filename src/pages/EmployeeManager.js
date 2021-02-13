import React from "react"
import TableWithFilterByCol from "shared/components/TableWithFilterByCol"
import { employeeData } from "shared/utility/fakeData"
import { ExpandDiv } from "shared/components/styled"
import { textFilter, selectFilter } from "react-bootstrap-table2-filter"
import "shared/style/employeeManager.scss"

const EmployeeManager = () => {
  const keyField = "id"

  const roleSelect = {
    ADMIN: "ADMIN",
    EMPLOYEE: "EMPLOYEE",
    MANAGER: "MANAGER",
  }

  const departmentSelect = {
    FoodManagement: "FoodManagement",
    CenterKitchen: "CenterKitchen",
    EmployeeManagement: "EmployeeManagement",
    Sales: "Sales",
    DeliveryManagement: "DeliveryManagement",
  }

  const titleSelect = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
  }

  let id_filter
  let department_filter
  let title_filter
  let role_filter

  const clearFilterHandler = () => {
    id_filter("")
    department_filter("")
    title_filter("")
    role_filter("") // roleFilter 是識別字
  }

  const columns = [
    {
      dataField: "id",
      text: "ID",
      filter: textFilter({
        getFilter: (filter) => {
          id_filter = filter
        },
      }),
      sort: true,
    },
    {
      dataField: "department",
      text: "部門",
      formatter: (cell) => departmentSelect[cell],
      filter: selectFilter({
        options: departmentSelect,
        getFilter: (filter) => {
          department_filter = filter
        },
      }),
      sort: true,
    },
    {
      dataField: "title",
      text: "職稱",
      formatter: (cell) => titleSelect[cell],
      filter: selectFilter({
        options: titleSelect,
        getFilter: (filter) => {
          title_filter = filter
        },
      }),
      sort: true,
    },
    {
      dataField: "account",
      text: "帳號",
      sort: true,
    },
    {
      dataField: "username",
      text: "姓名",
      sort: true,
    },
    {
      dataField: "email",
      text: "電子信箱",
      sort: true,
    },
    {
      dataField: "phone",
      text: "電話號碼",
    },
    {
      dataField: "role",
      text: "角色",
      formatter: (cell) => roleSelect[cell],
      filter: selectFilter({
        options: roleSelect,
        getFilter: (filter) => {
          role_filter = filter
        },
      }),
    },
  ]

  return (
    <ExpandDiv className="employee-manager">
      <TableWithFilterByCol
        keyField={keyField}
        data={employeeData}
        columns={columns}
        clearFilterHandler={clearFilterHandler}
      />
    </ExpandDiv>
  )
}

export default EmployeeManager
