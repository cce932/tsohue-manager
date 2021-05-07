import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectFilter, textFilter } from "react-bootstrap-table2-filter"
import { Redirect } from "react-router-dom"

import "shared/style/recipeManager.scss"
import useDialogContext from "hooks/useDialogContext"
import TableWithFilterByCol from "shared/components/TableWithFilterByCol"
import { getMeunName, transMSecToMin } from "shared/utility/common"
import { allPaths, recipeEditor } from "shared/constants/pathname"
import { ExpandDiv, PrimaryStrokeBtn } from "shared/components/styled"
import { getAllRecipes } from "actions/loadData"
import { deleteRecipe } from "actions/deleteData"
import { countSelectedId } from "shared/utility/common"
import { createRecipe } from "actions/addData"
import { recipeVersionOptions } from "shared/constants/options"

const RecipeManager = () => {
  const dispatch = useDispatch()
  const { allRecipes } = useSelector((state) => state.recipes)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [selectedId, setSelectedId] = useState([])
  const addDialog = useDialogContext()

  useEffect(() => {
    dispatch(getAllRecipes())
    setTimeout(() => {
      addDialog("小幫手：點兩下食譜可編輯喔")
    }, 1000)
  }, [addDialog, dispatch])

  const keyField = "id"

  let id_filter = () => null
  let name_filter = () => null
  let version_filter = () => null
  let likeCount_filter = () => null
  let price_filter = () => null

  const clearFilterHandler = () => {
    id_filter("")
    name_filter("")
    version_filter()
    likeCount_filter("")
    price_filter("")
  }

  const expandRow = {
    renderer: (row) => {
      const styledIi = row.recipeIngredients.map((ingredient, index) => {
        return (
          <tr key={index}>
            <td>{ingredient.ingredient.name}</td>
            <td>
              <b>{ingredient.quantityRequired}</b> {ingredient.ingredient.unit}
            </td>
          </tr>
        )
      })

      const styledStep = row.recipeSteps.map((step, index) => (
        <tr key={index}>
          <td>第{index + 1}步</td>
          <td>{step.note}</td>
          <td>{transMSecToMin(step.startTime)}</td>
        </tr>
      ))
      return (
        <div className="detail">
          <div className="step">
            <div>步驟</div>
            <table>
              <tbody>{styledStep}</tbody>
            </table>
          </div>
          <div className="ingredients">
            <div>食材</div>
            <table>
              <tbody>{styledIi}</tbody>
            </table>
          </div>
        </div>
      )
    },
    showExpandColumn: true,
    expandByColumnOnly: true,
  }

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
      dataField: "name",
      text: "名稱",
      filter: textFilter({
        getFilter: (filter) => {
          name_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
    },
    {
      dataField: "version",
      text: "版本",
      formatter: (cell) => recipeVersionOptions[cell],
      filter: selectFilter({
        options: recipeVersionOptions,
        getFilter: (filter) => {
          name_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
    },
    {
      dataField: "price",
      text: "價格",
      filter: textFilter({
        getFilter: (filter) => {
          price_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
    },
    {
      dataField: "likesCount",
      text: "收藏數",
      filter: textFilter({
        getFilter: (filter) => {
          likeCount_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
    },
  ]

  const handleDeleteRecipe = () => {
    if (selectedId.length > 0) {
      if (window.confirm(`確定刪除會員ID: ${selectedId.toString()}？`)) {
        dispatch(deleteRecipe(selectedId))
        setSelectedId([])
      }
    }
  }

  const handleCreateRecipe = () => {
    dispatch(createRecipe()).then((data) => {
      window.location = `${allPaths[recipeEditor]}${data.id}`
    })
  }

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      window.location = `${allPaths[recipeEditor]}${row.id}`
    },
  }

  return isLoggedIn ? (
    allRecipes ? (
      <ExpandDiv className="recipe-manager">
        <div className="tools">
          <PrimaryStrokeBtn onClick={handleCreateRecipe}>
            新增食譜
          </PrimaryStrokeBtn>
          <PrimaryStrokeBtn onClick={handleDeleteRecipe}>
            刪除食譜
          </PrimaryStrokeBtn>
          <PrimaryStrokeBtn onClick={clearFilterHandler}>
            清除搜尋
          </PrimaryStrokeBtn>
        </div>

        <TableWithFilterByCol
          keyField={keyField}
          data={allRecipes}
          columns={columns}
          selectRow={selectRow}
          expandRow={expandRow}
          rowEvents={rowEvents}
          hover
        />
      </ExpandDiv>
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

export default RecipeManager
