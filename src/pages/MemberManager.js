import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { textFilter, selectFilter } from "react-bootstrap-table2-filter"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import { Redirect } from "react-router-dom"
import { AiTwotoneEdit } from "react-icons/ai"

import "shared/style/memberManager.scss"
import TableWithFilterByCol from "shared/components/TableWithFilterByCol"
import { ExpandDiv, PrimaryStrokeBtn } from "shared/components/styled"
import { getAllMembers } from "actions/loadData"
import { changeMemberRole } from "actions/editData"
import { deleteMember } from "actions/deleteData"
import { countSelectedId } from "shared/utility/common"
import { getMeunName } from "shared/utility/common"
import { allPaths } from "shared/constants/pathname"
import StyledSpinner from "shared/components/StyledSpinner"
import { memberRoleOptions } from "shared/constants/options"
import color from "shared/style/color"
import useDialogContext from "hooks/useDialogContext"

const MemberManager = () => {
  const dispatch = useDispatch()
  const { allMembers } = useSelector((state) => state.members)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [selectedId, setSelectedId] = useState([])
  const addDialog = useDialogContext()

  useEffect(() => {
    dispatch(getAllMembers())
  }, [dispatch])

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
    role_filter() // roleFilter 是識別字
  }

  const cellEdit = cellEditFactory({
    mode: "dbclick",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, col) => {
      if (oldValue !== newValue) {
        dispatch(changeMemberRole(row.id, newValue))
          .then(() => addDialog(`更新會員ID: ${row.id}成功`, color.success))
          .catch(() =>
            addDialog(`更新會員ID: ${row.id}失敗 請再試一次`, color.accent)
          )
      }
    },
  })

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    clickToEdit: true,
    bgColor: "rgb(248, 249, 252)",
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedId(countSelectedId([row], isSelect, selectedId))
    },
    onSelectAll: (isSelect, rows, e) => {
      setSelectedId(countSelectedId(rows, isSelect, selectedId))
    },
  }

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
      text: "電子信箱",
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
      text: "電話號碼",
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
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 資格"}
        </>
      ),
      formatter: (cell) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        getFilter: (filter) => {
          role_filter = filter
        },
        placeholder: " ",
      }),
      editor: {
        type: Type.SELECT,
        options: Object.keys(memberRoleOptions).map((key) => ({
          value: key,
          label: memberRoleOptions[key],
        })),
      },
    },
  ]

  const handleDeleteMember = () => {
    if (selectedId.length > 0) {
      if (window.confirm(`確定刪除會員ID: ${selectedId.toString()}？`)) {
        dispatch(deleteMember(selectedId))
          .then(() =>
            addDialog(`成功刪除會員ID: ${selectedId.toString()}`, color.success)
          )
          .catch(() => addDialog("刪除會員失敗，請再試一次", color.accent))
        setSelectedId([])
      }
    }
  }

  return isLoggedIn ? (
    allMembers ? (
      <ExpandDiv className="member-manager">
        <div className="tools">
          <PrimaryStrokeBtn onClick={handleDeleteMember}>
            刪除會員
          </PrimaryStrokeBtn>
          <PrimaryStrokeBtn onClick={clearFilterHandler}>
            清除搜尋
          </PrimaryStrokeBtn>
        </div>

        <TableWithFilterByCol
          keyField={keyField}
          data={allMembers}
          columns={columns}
          cellEdit={cellEdit}
          selectRow={selectRow}
        />
      </ExpandDiv>
    ) : (
      <StyledSpinner />
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

export default MemberManager
