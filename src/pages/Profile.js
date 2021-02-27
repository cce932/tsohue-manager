import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PrimaryStrokeBtn } from "shared/components/styled"
import { allPaths, pwdReset } from "shared/constants/pathname"
import { ExpandDiv } from "shared/components/styled.js"
import "shared/style/profile.scss"

const Profile = () => {
  const dispatch = useDispatch()
  const {
    account,
    department,
    email,
    phone,
    role,
    title,
    username,
  } = useSelector((state) => state.auth.user)

  return (
    <ExpandDiv className="profile">
      <Link to={`${allPaths[pwdReset]}`}>
        <PrimaryStrokeBtn>{pwdReset}</PrimaryStrokeBtn>
      </Link>
      <div className="my-data">
        <label>部門</label>
        <label>{department}</label>
        <br />
        <label>職稱</label>
        <label>{title}</label>
        <br />
        <label>帳號</label>
        <label>{account}</label>
        <br />
        <label>姓名</label>
        <label>{username}</label>
        <br />
        <label>信箱</label>
        <label>{email}</label>
        <br />
        <label>電話</label>
        <label>{phone}</label>
        <br />
        <label>角色</label>
        <label>{role}</label>
        <br />
      </div>
    </ExpandDiv>
  )
}

export default Profile
