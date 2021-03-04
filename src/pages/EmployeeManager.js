import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { textFilter, selectFilter } from "react-bootstrap-table2-filter"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { isEmail, isNumeric } from "validator"

import "shared/style/employeeManager.scss"
import {
  ExpandDiv,
  PrimaryStrokeBtn,
  SecondaryBtn,
} from "shared/components/styled"
import TableWithFilterByCol from "shared/components/TableWithFilterByCol"
import useDialogContext from "hooks/useDialogContext"
import { getAllEmployees } from "actions/loadData"
import { Redirect } from "react-router-dom"
import { getMeunName } from "shared/utility/common"
import { allPaths } from "shared/constants/pathname"
import { modifyEmployeeData, changeEmployeeRole } from "actions/editData"
import { deleteEmployee } from "actions/deleteData"
import { countSelectedId } from "shared/utility/common"
import { register } from "actions/auth"

const required = (value) => {
  if (!value.length) {
    return <div className="note">需輸入值</div>
  }
}

const validEmail = (value) => {
  if (!isEmail(value)) {
    return <div className="note">格式不正確</div>
  }
}

const validPhone = (value) => {
  if (!isNumeric(value)) {
    return <div className="note">格式不正確</div>
  }
}

const validDpt = (value) => {
  if (!(value in departmentSelect)) {
    return <div className="note">非有效值</div>
  }
}

const validTitle = (value) => {
  if (!(value in titleSelect)) {
    return <div className="note">非有效值</div>
  }
}

const validRole = (value) => {
  if (!(value in roleSelect)) {
    return <div className="note">非有效值</div>
  }
}

const departmentSelect = {
  FoodManagement: "FoodManagement",
  Sales: "Sales",
  Transport: "Transport",
  CustomerService: "CustomerService",
  CentralKitchen: "CentralKitchen",
  EmployeeManagement: "EmployeeManagement",
}

const titleSelect = {
  銷售經理: "銷售經理",
  執行長: "執行長",
  主管: "主管",
  員工: "員工",
}

const roleSelect = {
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE",
  MANAGER: "MANAGER",
}

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

  let id_filter = () => null
  let department_filter = () => null
  let title_filter = () => null
  let account_filter = () => null
  let username_filter = () => null
  let email_filter = () => null
  let phone_filter = () => null
  let role_filter = () => null

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
        if (col.dataField === "role") {
          dispatch(changeEmployeeRole(row.id, newValue)).then(
            (res) => addDialog(`已更新ID: ${res.id}的角色為${res.role}`),
            (err) => null
          )
        } else {
          // 限dept或title
          dispatch(modifyEmployeeData(row.id, col.dataField, newValue)).then(
            (res) =>
              addDialog(`已更新ID: ${res.id}的${col.dataField}為${res.role}`),
            (err) => null
          )
        }
      }
    },
  })

  const columns = [
    {
      dataField: "id",
      text: "ID",
      filter: textFilter({
        getFilter: (filter) => {
          id_filter = filter
        },
        placeholder: " ",
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
        placeholder: " ",
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
            value: "CentralKitchen",
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
        placeholder: " ",
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
        placeholder: " ",
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
        placeholder: " ",
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "email",
      text: "信箱",
      filter: textFilter({
        getFilter: (filter) => {
          email_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "phone",
      text: "電話",
      filter: textFilter({
        getFilter: (filter) => {
          phone_filter = filter
        },
        placeholder: " ",
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
        placeholder: " ",
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
        dispatch(deleteEmployee(selectedId))
        setSelectedId([])
        // window.location.reload() // 不能在這寫 要在middleware寫 不然這邊不會等所有程序跑完就會重整 這樣會沒刪到
      }
    }
  }

  const form = useRef()
  const checkBtn = useRef()
  const { message } = useSelector((state) => {
    return state.messages
  })

  const [account, setAccount] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [department, setDepartment] = useState("")
  const [title, setTitle] = useState("")
  const [role, setRole] = useState("")

  const addDialog = useDialogContext()

  const handleRegister = (e) => {
    e.preventDefault()
    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        register(department, title, account, username, email, phone, role)
      ).then(
        (res) => {
          clearRegisterInput()
          addDialog(`註冊「${res.username}」成功`)
        },
        (error) => null
      )
    }
  }

  const clearRegisterInput = () => {
    // 註冊成功後 看起來是有清空input 但是state中都沒清(清了就會觸發onChange 進而觸發error) 因為不影響 下次輸入時 onChange就會自動setState了
    document.getElementById("account").value = ""
    document.getElementById("username").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("department").value = ""
    document.getElementById("title").value = ""
    document.getElementById("role").value = ""
  }

  const onChangeAccount = (e) => {
    const account = e.target.value
    setAccount(account)
  }

  const onChangeUsername = (e) => {
    const useranme = e.target.value
    setUsername(useranme)
  }

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePhone = (e) => {
    const phone = e.target.value
    setPhone(phone)
  }

  const onChangeDepartment = (e) => {
    const department = e.target.value
    setDepartment(department)
  }

  const onChangeTitle = (e) => {
    const title = e.target.value
    setTitle(title)
  }

  const onChangeRole = (e) => {
    const role = e.target.value
    setRole(role)
  }

  return isLoggedIn ? (
    allEmployees ? (
      <>
        <ExpandDiv className="employee-manager">
          <div className="tools">
            <PrimaryStrokeBtn
              disabled={!isAdmin()}
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="true"
              // aria-controls="collapseExample"
            >
              新增員工
            </PrimaryStrokeBtn>
            <PrimaryStrokeBtn
              disabled={!isAdmin()}
              onClick={handleDeleteEmployee}
            >
              刪除員工
            </PrimaryStrokeBtn>
            <PrimaryStrokeBtn onClick={clearFilterHandler}>
              清除搜尋
            </PrimaryStrokeBtn>
            <div className="collapse" id="collapseExample">
              <Form id="registerForm" onSubmit={handleRegister} ref={form}>
                <div className={`row form`}>
                  <div className={`col-11 input`}>
                    <div>
                      <label>部門</label>
                      <Input
                        id="department"
                        type="text"
                        name="department"
                        onChange={onChangeDepartment}
                        value={department}
                        list="dptList"
                        validations={[required, validDpt]}
                      />
                      <datalist id="dptList">
                        <option value="FoodManagement" />
                        <option value="CustomerService" />
                        <option value="Transport" />
                        <option vlaue="Sales" />
                        <option value="訂單(暫不可選)" />
                        <option value="央廚(暫不可選)" />
                        <option value="食譜(暫不可選)" />
                      </datalist>
                    </div>

                    <div>
                      <label>職稱</label>
                      <Input
                        id="title"
                        type="text"
                        name="title"
                        onChange={onChangeTitle}
                        value={title}
                        list="titleList"
                        validations={[required, validTitle]}
                      />
                      <datalist id="titleList">
                        <option value="執行長" />
                        <option value="主管" />
                        <option value="員工" />
                      </datalist>
                    </div>

                    <div>
                      <label>帳號</label>
                      <Input
                        id="account"
                        type="text"
                        name="account"
                        onChange={onChangeAccount}
                        value={account}
                        validations={[required]}
                      />
                    </div>
                    <div>
                      <label>姓名</label>
                      <Input
                        id="username"
                        type="text"
                        name="username"
                        onChange={onChangeUsername}
                        value={username}
                        validations={[required]}
                      />
                    </div>
                    <div>
                      <label>信箱</label>
                      <Input
                        id="email"
                        type="text"
                        name="email"
                        onChange={onChangeEmail}
                        value={email}
                        validations={[required, validEmail]}
                      />
                    </div>
                    <div>
                      <label>電話</label>
                      <Input
                        id="phone"
                        type="text"
                        name="phone"
                        onChange={onChangePhone}
                        value={phone}
                        validations={[required, validPhone]}
                      />
                    </div>
                    <div>
                      <label>角色</label>
                      <Input
                        id="role"
                        type="text"
                        name="role"
                        onChange={onChangeRole}
                        value={role}
                        list="roleList"
                        validations={[required, validRole]}
                      />
                      <datalist id="roleList">
                        <option value="ADMIN" />
                        <option value="EMPLOYEE" />
                        <option value="MANAGER(暫不可選)" />
                      </datalist>
                    </div>

                    {message &&
                      (/沒有權限/.test(message) ? (
                        addDialog(message)
                      ) : (
                        <div className="message">{message}</div>
                      ))}
                  </div>

                  <div className={`col-1 button`}>
                    <SecondaryBtn>確定</SecondaryBtn>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <TableWithFilterByCol
            keyField={keyField}
            data={allEmployees}
            columns={columns}
            cellEdit={isAdmin() ? cellEdit : {}}
            selectRow={{
              mode: "checkbox",
              clickToSelect: true,
              clickToEdit: true,
              bgColor: "rgb(248, 249, 252)",
              onSelect: (row, isSelect) => {
                setSelectedId(countSelectedId([row], isSelect, selectedId))
              },
              onSelectAll: (isSelect, rows) => {
                setSelectedId(countSelectedId(rows, isSelect, selectedId))
              },
              nonSelectable: [user.id],
              nonSelectableStyle: { backgroundColor: "rgb(253, 221, 132)" },
            }}
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
