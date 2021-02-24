import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import "shared/style/login.scss"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import { login } from "actions/auth"
import { encrypt } from "shared/utility/feature"

const required = (value) => {
  if (!value.length) {
    return <div className="note">需輸入值</div>
  }
}

const Login = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.messages)

  const dispatch = useDispatch()

  const onChangeAccount = (e) => {
    const account = e.target.value
    setAccount(account)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    setLoading(true)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(account, encrypt(password))) // 這邊可以寫func在dispatch() 是因為有thunk
        .then(() => {
          props.history.push("/")
          window.location.reload()
        })
        .catch((error) => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }

    if (isLoggedIn) {
      return <Redirect to="/" />
    }
  }

  return (
    // ref的form來自 form=useRef()
    <div className={`login`}>
      <Form onSubmit={handleLogin} ref={form}>
        <label htmlFor="account">帳號</label>
        <Input
          type="text"
          name="account"
          value={account}
          onChange={onChangeAccount}
          validations={[required]}
        />
        <br />

        <label htmlFor="password">密碼</label>
        <Input
          type="text"
          name="password"
          value={password}
          onChange={onChangePassword}
          validations={[required]}
        />
        <br />

        {message && <label className="message">{message}</label>}

        <button disabled={loading}>
          {loading ? ( // 如果正在loading的話 那就不能按此button
            // <span className='spinner-border spinner-border-sm'></span> // boostrape的寫法 顯示loading icon
            <span>登入中</span>
          ) : (
            <span>確定</span>
          )}
        </button>

        {/* 用來控制validation的 */}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  )
}

export default Login
