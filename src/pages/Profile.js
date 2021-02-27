import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Router, Link } from "react-router-dom"
import { PrimaryStrokeBtn } from "shared/components/styled"
import { allPaths, pwdReset } from "shared/constants/pathname"

const Profile = () => {
  // const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getMyData())
  }, [])

  return (
    <>
      <div className=""></div>
      <Link to={`${allPaths[pwdReset]}`}>
        <PrimaryStrokeBtn>{pwdReset}</PrimaryStrokeBtn>
      </Link>
    </>
  )
}

export default Profile
