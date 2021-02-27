// TODO: 接api 加上註冊權限審核機制/確定部門、職位
import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import "shared/style/resetPwd.scss"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import { clearMessage } from "actions/message"
import { history } from "helpers/history"
import { resetPwd } from "actions/editData"
import { encrypt } from "shared/utility/feature"

const required = (value) => {
  if (!value.length) {
    return <div className="note">需輸入值</div>
  }
}

const validPassword = (value) => {
  if (value.length < 8 || value.length > 20) {
    return <div className="note">字數請介於8~20</div>
  }
}

const validPasswordCheck = (value, props, components) => {
  if (value !== components["newPassword"][0].value) {
    // 用components取得其他input的value
    return <div className="note">必須與密碼一致</div>
  }
}

const ResetPwd = () => {
  const form = useRef()
  const checkBtn = useRef()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [successful, setSuccessful] = useState(false)

  const { message } = useSelector((state) => state.messages)
  const { id, account } = useSelector((state) => state.auth.user)

  const dispatch = useDispatch()

  const onChangeOldPassword = (e) => {
    const oldPassword = e.target.value
    setOldPassword(oldPassword)
  }

  const onChangeNewPassword = (e) => {
    const newPassword = e.target.value
    setNewPassword(newPassword)
  }

  const onChangePasswordCheck = (e) => {
    const passwordCheck = e.target.value
    setPasswordCheck(passwordCheck)
  }

  const handleResetPwd = (e) => {
    e.preventDefault()
    setSuccessful(false)
    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        resetPwd(
          id,
          encrypt(newPassword, account),
          encrypt(oldPassword, account)
        )
      )
        .then(() => {
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
    <div className={`resetPwd`}>
      <Form onSubmit={handleResetPwd} ref={form}>
        {!successful ? (
          <div className="form">
            <label>舊密碼</label>
            <Input
              type="text"
              name="oldPassword"
              onChange={onChangeOldPassword}
              value={oldPassword}
              placeholder="英數 8-20 字"
              validations={[required, validPassword]}
            />
            <br />
            <label>新密碼</label>
            <Input
              type="text"
              name="newPassword"
              onChange={onChangeNewPassword}
              value={newPassword}
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

            <button>{successful ? "變更中" : "確定"}</button>
          </div>
        ) : (
          <Redirect to="/login" />
        )}

        {message && <div className="message">{message}</div>}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  )
}

export default ResetPwd
