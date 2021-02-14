import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { textFilter, selectFilter } from "react-bootstrap-table2-filter"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"

import TableWithFilterByCol from "shared/components/TableWithFilterByCol"
import { memberData } from "shared/utility/fakeData"
import { ExpandDiv } from "shared/components/styled"
import { getAllMembers } from "actions/fetchData"
import { changeMemberRole } from "actions/editData"

const MemberManager = () => {
  const dispatch = useDispatch()
  const { allMembers } = useSelector((state) => state.members)
  const { isLoggedIn } = useSelector((state) => state.auth)

  useEffect(()=> {
    dispatch(getAllMembers())
  }, [])

  const keyField = "id"
  const selectOptions = {
    MEMBER: "MEMBER",
    VIP: "VIP",
  }

  let id_filter = () => null
  let account_filter = () => null
  let username_filter = () => null
  let email_filter = () => null
  let phone_filter = () => null
  let role_filter = () => null

  const clearFilterHandler = () => {
    id_filter("")
    account_filter("")
    username_filter("")
    email_filter("")
    phone_filter("")
    role_filter("") // roleFilter 是識別字
  }

  const cellEdit = cellEditFactory({
    mode: "click",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, col) => {
      
      if (oldValue !== newValue) {
        console.log(row.id) // DOING 更改member的role，接下來在這邊發action
        // useDispatch(changeMemberRole())
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
      formatter: (cell) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        getFilter: (filter) => {
          role_filter = filter
        },
      }),
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "MEMBER",
            label: "MEMBER",
          },
          {
            value: "VIP",
            label: "VIP",
          },
        ],
      },
    },
  ]

  return isLoggedIn ? (
    allMembers ? (
      <ExpandDiv>
        <TableWithFilterByCol
          keyField={keyField}
          data={allMembers}
          columns={columns}
          clearFilterHandler={clearFilterHandler}
          cellEdit={cellEdit}
        />
      </ExpandDiv>
    ) : (
      <h1>Loading</h1>
    )
  ) : (
    <h1>please login</h1>
  )
}

export default MemberManager
