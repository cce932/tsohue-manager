import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { textFilter, selectFilter } from "react-bootstrap-table2-filter"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"

import "shared/style/employeeManager.scss"
import { ExpandDiv, PrimaryStrokeBtn } from "shared/components/styled"
import TableWithFilterByCol from "shared/components/TableWithFilterByCol"
import { getAllEmployees } from "actions/loadData"
import { Redirect } from "react-router-dom"
import { getMeunName } from "shared/utility/common"
import { allPaths } from "shared/constants/pathname"
import { modifyEmployeeData } from "actions/editData"
import { deleteEmployee } from "actions/deleteData"
import { countSelectedId } from "shared/utility/common"

const EmployeeManager = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, user } = useSelector((state) => state.auth)
  const { allEmployees } = useSelector((state) => state.employees)
  const [selectedId, setSelectedId] = useState([])
  const isAdmin = () => user.role === "ADMIN"

  useEffect(() => {
    dispatch(getAllEmployees())
  }, [])

  const keyField = "id"

  const roleSelect = {
    ADMIN: "ADMIN",
    EMPLOYEE: "EMPLOYEE",
    MANAGER: "MANAGER",
  }

  const departmentSelect = {
    FoodManagement: "FoodManagement",
    Sales: "Sales",
    Transport: "Transport",
    CustomerService: "CustomerService",
    CenterKitchen: "CenterKitchen",
    EmployeeManagement: "EmployeeManagement",
  }

  const titleSelect = {
    銷售經理: "銷售經理",
    執行長: "執行長",
    主管: "主管",
    員工: "員工",
  }

  let id_filter
  let department_filter
  let title_filter
  let account_filter
  let username_filter
  let email_filter
  let phone_filter
  let role_filter

  const clearFilterHandler = () => {
    id_filter("")
    department_filter()
    title_filter()
    account_filter("")
    username_filter("")
    email_filter("")
    phone_filter("")
    role_filter() // roleFilter 是識別字
  }

  const cellEdit = cellEditFactory({
    mode: "dbclick",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, col) => {
      if (oldValue !== newValue) {
        dispatch(modifyEmployeeData(row.id, col.dataField, newValue)) // 可能是dept或title或role
      }
    },
  })

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    clickToEdit: true,
    bgColor: "rgb(244, 245, 248)",
    onSelect: (row, isSelect) => {
      setSelectedId(countSelectedId([row], isSelect, selectedId))
    },
    onSelectAll: (isSelect, rows) => {
      setSelectedId(countSelectedId(rows, isSelect, selectedId))
    },
    nonSelectable: [user.id],
    nonSelectableStyle: { color: "rgb(165, 90, 70" },
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
          console.log("department_filter", filter)
          department_filter = filter
        },
      }),
      sort: true,
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "FoodManagement",
            label: "食材管理",
          },
          {
            value: "Transport",
            label: "物流管理",
          },
          {
            value: "Sales",
            label: "業務",
          },
          {
            value: "CustomerService",
            label: "客服",
          },
          {
            value: "CenterKitchen",
            label: "中央廚房管理(暫不可選)",
          },
          {
            value: "EmployeeManagement",
            label: "員工管理(暫不可選)",
          },
        ],
      },
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
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "執行長",
            label: "執行長",
          },
          {
            value: "主管",
            label: "主管",
          },
          {
            value: "員工",
            label: "員工",
          },
        ],
      },
    },
    {
      dataField: "account",
      text: "帳號",
      filter: textFilter({
        getFilter: (filter) => {
          account_filter = filter
        },
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "username",
      text: "姓名",
      filter: textFilter({
        getFilter: (filter) => {
          username_filter = filter
        },
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "email",
      text: "電子信箱",
      filter: textFilter({
        getFilter: (filter) => {
          email_filter = filter
        },
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "phone",
      text: "電話號碼",
      filter: textFilter({
        getFilter: (filter) => {
          phone_filter = filter
        },
      }),
      editable: false,
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
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "ADMIN",
            label: "ADMIN",
          },
          {
            value: "MANAGER",
            label: "MANAGER(暫不可選)",
          },
          {
            value: "EMPLOYEE",
            label: "EMPLOYEE",
          },
        ],
      },
    },
  ]

  const handleDeleteEmployee = () => {
    if (selectedId.length > 0) {
      if (window.confirm(`確定刪除員工ID: ${selectedId.toString()}？`)) {
        id_filter("")
        department_filter()
        title_filter()
        account_filter("")
        username_filter("")
        email_filter("")
        phone_filter("")
        role_filter()

        dispatch(deleteEmployee(selectedId))
        setSelectedId([])
      }
    }
  }

  return isLoggedIn ? (
    allEmployees ? (
      <>
        <ExpandDiv className="employee-manager">
          <div className="tools">
            <PrimaryStrokeBtn disabled={!isAdmin()}>新增員工</PrimaryStrokeBtn>
            <PrimaryStrokeBtn
              disabled={!isAdmin()}
              onClick={handleDeleteEmployee}
            >
              刪除員工
            </PrimaryStrokeBtn>
            <PrimaryStrokeBtn onClick={clearFilterHandler}>
              清除篩選
            </PrimaryStrokeBtn>
          </div>
          <TableWithFilterByCol
            keyField={keyField}
            data={allEmployees}
            columns={columns}
            cellEdit={isAdmin() ? cellEdit : {}}
            selectRow={selectRow}
          />
        </ExpandDiv>
      </>
    ) : (
      <h1>Loading</h1>
    )
  ) : (
    <>
      {window.alert(
        `欲前往「${getMeunName(
          allPaths,
          window.location.pathname
        )}」 請先登入喔`
      )}
      <Redirect to="/login" />
    </>
  )
}

export default EmployeeManager
