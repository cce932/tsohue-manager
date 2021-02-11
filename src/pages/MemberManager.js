import React from "react"
import Table from "shared/components/Table"
import "shared/style/memberManager.scss"
import { memberData } from "shared/utility/fakeData"
import { ExpandDiv } from "shared/components/styled"

const MemberManager = () => {
  const columns = [
    {
      dataField: "account",
      text: "帳號",
    },
    {
      dataField: "username",
      text: "姓名",
    },
    {
      dataField: "email",
      text: "電子信箱",
    },
    {
      dataField: "phone",
      text: "電話號碼",
    },
    {
      dataField: "role",
      text: "角色",
    },
  ]

  return (
    <ExpandDiv>
      <Table data={memberData} columns={columns} />
    </ExpandDiv>
  )
}

export default MemberManager
