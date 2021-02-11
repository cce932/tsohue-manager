// TODO: 接api 加上註冊權限審核機制/確定部門、職位
import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import "shared/style/register.scss"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { isEmail, isNumeric } from "validator"

import { register } from "actions/auth"
import { clearMessage } from "actions/message"
import { history } from "helpers/history"

// 設定驗證
// dispatch action
// return

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

const validAccount = (value) => {
  if (value.length < 6 || value.length > 20) {
    return <div className="note">字數請介於6~20</div>
  }
}

const validPassword = (value) => {
  if (value.length < 8 || value.length > 20) {
    return <div className="note">字數請介於8~20</div>
  }
}

const validPasswordCheck = (value, props, components) => {
  if (value !== components["password"][0].value) {
    // 用components取得其他input的value
    return <div className="note">必須與密碼一致</div>
  }
}

const validPhone = (value) => {
  if (!isNumeric(value)) {
    return <div className="note">格式不正確</div>
  }
}

const Register = () => {
  const form = useRef()
  const checkBtn = useRef()

  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [department, setDepartment] = useState("")
  const [title, setTitle] = useState("")
  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector((state) => {
    return state.messages
  })

  const dispatch = useDispatch()

  const onChangeAccount = (e) => {
    const account = e.target.value
    setAccount(account)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const onChangePasswordCheck = (e) => {
    const passwordCheck = e.target.value
    setPasswordCheck(passwordCheck)
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

  const handleRegister = (e) => {
    e.preventDefault()
    setSuccessful(false)

    // check validation functions in `validations`
    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(account, password, username, phone, email))
        .then(() => {
          // 不直接跳轉至login
          setSuccessful(true)
        })
        .catch(() => {
          setSuccessful(false)
        })
    }
  }

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage())
    })
  }, [dispatch])

  return (
    <div className={`register`}>
      <Form onSubmit={handleRegister} ref={form}>
        {!successful ? (
          <div className="form">
            <label>帳號</label>
            <Input
              type="text"
              name="account"
              onChange={onChangeAccount}
              value={account}
              placeholder="英數 6-20 字"
              validations={[required, validAccount]}
            />
            <br />
            <label>密碼</label>
            <Input
              type="text"
              name="password"
              onChange={onChangePassword}
              value={password}
              placeholder="英數 8-20 字"
              validations={[required, validPassword]}
            />
            <br />
            <label>密碼確認</label>
            <Input
              type="text"
              name="passwordCheck"
              onChange={onChangePasswordCheck}
              value={passwordCheck}
              placeholder="需與密碼相同"
              validations={[required, validPasswordCheck]}
            />
            <br />
            <label>姓名</label>
            <Input
              type="text"
              name="username"
              onChange={onChangeUsername}
              value={username}
              validations={[required]}
            />
            <br />
            <label>電子信箱</label>
            <Input
              type="text"
              name="email"
              onChange={onChangeEmail}
              value={email}
              validations={[required, validEmail]}
            />
            <br />
            <label>手機</label>
            <Input
              type="text"
              name="phone"
              onChange={onChangePhone}
              value={phone}
              validations={[required, validPhone]}
            />
            <br />
            <label>部門</label>
            <Input
              type="text"
              name="department"
              onChange={onChangeDepartment}
              value={department}
              list="dptList"
              validations={[required]}
            />
            <datalist id="dptList">
              <option value="訂單" />
              <option value="央廚" />
              <option value="食材" />
              <option value="食譜" />
              <option value="物流" />
            </datalist>
            <br />
            <label>職位</label>
            <Input
              type="text"
              name="title"
              onChange={onChangeTitle}
              value={title}
              list="titleList"
              validations={[required]}
            />
            <datalist id="titleList">
              <option value="一般員工" />
              <option value="主管" />
              <option value="Admin" />
            </datalist>
            <br />

            <button>{successful ? "註冊中" : "確定"}</button>
          </div>
        ) : (
          <Redirect to="/login" />
        )}

        {message && <div className="message">{message}</div>}

        {/* Then CheckButton helps us to verify 
                if the form validation is successful or not.
                So this button will not display on the form. */}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  )
}

export default Register
