import React from "react"
import TableWithFilterByCol from "shared/components/TableWithFilterByCol"
import { memberData } from "shared/utility/fakeData"
import { ExpandDiv } from "shared/components/styled"
import { textFilter, selectFilter } from "react-bootstrap-table2-filter"

const MemberManager = () => {
  const keyField = "id"
  const selectOptions = {
    MEMBER: "MEMBER",
    VIP: "VIP",
  }

  let id_filter
  let account_filter
  let username_filter
  let email_filter
  let phone_filter
  let role_filter

  const clearFilterHandler = () => {
    id_filter("")
    account_filter("")
    username_filter("")
    email_filter("")
    phone_filter("")
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
      dataField: "account",
      text: "帳號",
      filter: textFilter({
        getFilter: (filter) => {
          account_filter = filter
        },
      }),
      sort: true,
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
    },
    {
      dataField: "phone",
      text: "電話號碼",
      filter: textFilter({
        getFilter: (filter) => {
          phone_filter = filter
        },
      }),
    },
    {
      dataField: "role",
      text: "角色",
      formatter: (cell) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        getFilter: (filter) => {
          role_filter = filter
        },
      }),
    },
  ]

  return (
    <ExpandDiv>
      <TableWithFilterByCol
        keyField={keyField}
        data={memberData}
        columns={columns}
        clearFilterHandler={clearFilterHandler}
      />
    </ExpandDiv>
  )
}

export default MemberManager
