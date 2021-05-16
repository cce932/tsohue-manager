import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter"
import { Redirect } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, { Comparator } from "react-bootstrap-table2-filter"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa"
import { AiTwotoneEdit } from "react-icons/ai"

import "shared/style/ingredient.scss"
import { SolidSpan } from "shared/components/styled"
import AddIngredient from "shared/components/addIngredient"
import sizePerPageRenderer from "shared/components/SizePerPageRenderer"
import StyledSpinner from "shared/components/StyledSpinner"
import { ExpandDiv, PrimaryStrokeBtn } from "shared/components/styled"
import { getAllIngredients } from "actions/loadData"
import { deleteIngredient } from "actions/deleteData"
import { countSelectedId } from "shared/utility/common"
import { getMeunName } from "shared/utility/common"
import useDialogContext from "hooks/useDialogContext"
import { allPaths } from "shared/constants/pathname"
import {
  CHIngredientCategoryOptions,
  stockStatusOptions,
} from "shared/constants/options"
import { USED_INGREDIENT_DELETE_ERROR } from "shared/constants/messages"
import color from "shared/style/color"
import { modifyIngredientData } from "actions/editData"

const stockStatusFormatter = (cell, row) => {
  if (!row.status) {
    return (
      <SolidSpan
        {...{
          backgroundColor: color.accent,
          padding: "3px 10px",
          margin: "0",
          fontSize: "0.9rem",
        }}
      >
        {stockStatusOptions[cell]}
      </SolidSpan>
    )
  } else {
    return (
      <SolidSpan
        {...{
          backgroundColor: color.third,
          padding: "3px 10px",
          margin: "0",
          fontSize: "0.9rem",
        }}
      >
        {stockStatusOptions[cell]}
      </SolidSpan>
    )
  }
}

const IngredientsStock = () => {
  const dispatch = useDispatch()
  const { allIngredients } = useSelector((state) => state.ingredients)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.messages)
  const [selectedId, setSelectedId] = useState([])
  const addDialog = useDialogContext()

  useEffect(() => {
    dispatch(getAllIngredients())
  }, [dispatch])

  useEffect(() => {
    message && addDialog(message?.message || message, message?.color)
  }, [addDialog, message])

  const keyField = "id"

  const sortOption = {
    sortCaret: (order, column) => {
      if (!order)
        return (
          <span>
            &nbsp;&nbsp;
            <FaSort fill="#b4b8bd" />
          </span>
        )
      else if (order === "asc")
        return (
          <span>
            &nbsp;&nbsp;
            <FaSortUp fill="#e76845" />
          </span>
        )
      else if (order === "desc")
        return (
          <span>
            &nbsp;&nbsp;
            <FaSortDown fill="#e76845" />
          </span>
        )
    },
  }

  let id_filter
  let category_filter
  let country_filter
  let city_filter
  let name_filter
  let price_filter
  let status_filter
  let safetyStock_filter
  let stock_filter

  const clearFilterHandler = () => {
    // bug: 資料動果就不能清除了
    typeof id_filter === "function" && id_filter("")
    typeof category_filter === "function" && category_filter()
    typeof country_filter === "function" && country_filter("")
    typeof city_filter === "function" && city_filter("")
    typeof name_filter === "function" && name_filter("")
    typeof price_filter === "function" && price_filter("")
    typeof status_filter === "function" && status_filter("")
    typeof safetyStock_filter === "function" && safetyStock_filter("")
    typeof stock_filter === "function" && stock_filter("")
  }

  const selectRow = {
    mode: "checkbox",
    bgColor: "rgb(248, 249, 252)",
    clickToSelect: true,
    clickToEdit: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedId(countSelectedId([row], isSelect, selectedId))
    },
    onSelectAll: (isSelect, rows, e) => {
      setSelectedId(countSelectedId(rows, isSelect, selectedId))
    },
  }

  const cellEdit = cellEditFactory({
    mode: "dbclick",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, col) => {
      if (oldValue !== newValue) {
        dispatch(modifyIngredientData(row.id, row)) // post all cols to api because of null int field problem in backend
          .then(() => addDialog(`更新食材ID: ${row.id}成功`, color.success))
          .catch(() =>
            addDialog(`更新食材ID: ${row.id}失敗 請再試一次`, color.accent)
          )
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
        placeholder: " ",
      }),
      sort: true,
    },
    {
      dataField: "category",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 種類"}
        </>
      ),
      formatter: (cell) => CHIngredientCategoryOptions[cell],
      filter: selectFilter({
        options: CHIngredientCategoryOptions,
        getFilter: (filter) => {
          category_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editor: {
        type: Type.SELECT,
        options: Object.keys(CHIngredientCategoryOptions).map((key) => ({
          value: key,
          label: CHIngredientCategoryOptions[key],
        })),
      },
    },
    {
      dataField: "name",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 名稱"}
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          name_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editor: {
        type: Type.TEXTAREA,
      },
    },
    {
      dataField: "price",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 價格"}
        </>
      ),
      filter: numberFilter({
        getFilter: (filter) => {
          price_filter = filter
        },
        placeholder: " ",
        defaultValue: { comparator: Comparator.EQ },
      }),
      sort: true,
      editor: {
        type: Type.TEXTAREA,
      },
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "須為數字",
          }
        }
      },
    },
    {
      dataField: "country",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 產地國"}
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          country_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editor: {
        type: Type.TEXTAREA,
      },
    },
    {
      dataField: "city",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 產地區"}
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          city_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editor: {
        type: Type.TEXTAREA,
      },
    },
    {
      dataField: "status",
      text: "庫存狀態",
      formatter: stockStatusFormatter,
      filter: selectFilter({
        options: stockStatusOptions,
        getFilter: (filter) => {
          status_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "stock",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 庫存"}
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          stock_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editor: {
        type: Type.TEXTAREA,
      },
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "須為數字",
          }
        }
      },
    },
    {
      dataField: "safetyStock",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 安全存量"}
        </>
      ),
      filter: textFilter({
        getFilter: (filter) => {
          safetyStock_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editor: {
        type: Type.TEXTAREA,
      },
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "須為數字",
          }
        }
      },
    },
    {
      dataField: "unit",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 單位"}
        </>
      ),
      editor: {
        type: Type.TEXTAREA,
      },
    },
    {
      dataField: "kcal",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 熱量"}
        </>
      ),
      sort: true,
      editor: {
        type: Type.TEXTAREA,
      },
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "須為數字",
          }
        }
      },
    },
  ]

  const handleDeleteIngredient = () => {
    if (selectedId.length > 0) {
      if (window.confirm(`確定刪除食材ID: ${selectedId.toString()}？`)) {
        dispatch(deleteIngredient(selectedId))
          .then(() =>
            addDialog(`刪除食材ID: ${selectedId.toString()}成功`, color.success)
          )
          .catch((error) =>
            addDialog(
              USED_INGREDIENT_DELETE_ERROR.test(error.message)
                ? `刪除食材ID:${selectedId.toString()}失敗，尚有烹飪包需要此食材`
                : `刪除食材失敗，請再試一次`,
              color.accent
            )
          )
        setSelectedId([])
      }
    }
  }

  // const rowEvents = {
  //   onDoubleClick: (e, row, rowIndex) => {
  //     window.location = `${allPaths[ingredientDetail]}${row.id}`
  //   },
  // }

  return isLoggedIn ? (
    allIngredients ? (
      <ExpandDiv className="ingredients-stock">
        <div className="tools">
          <PrimaryStrokeBtn
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="true"
          >
            新增食材
          </PrimaryStrokeBtn>
          <PrimaryStrokeBtn onClick={handleDeleteIngredient}>
            刪除食材
          </PrimaryStrokeBtn>
          <PrimaryStrokeBtn onClick={clearFilterHandler}>
            清除搜尋
          </PrimaryStrokeBtn>

          <AddIngredient />
        </div>

        <BootstrapTable
          keyField={keyField}
          data={allIngredients}
          columns={columns}
          selectRow={selectRow}
          bordered={false}
          noDataIndication="空空如也 ~"
          pagination={paginationFactory({
            // 不能放render外 因為還沒載好allIngredients
            sizePerPageList: [
              { text: "少", value: 13 },
              { text: "多", value: 18 },
              { text: "全部", value: allIngredients.length },
            ],
            hidePageListOnlyOnePage: true,
            sizePerPageRenderer,
          })}
          filter={filterFactory()}
          sort={sortOption}
          // rowEvents={rowEvents}
          cellEdit={cellEdit}
        />
        <label className="dataLength">共 {allIngredients.length} 筆</label>
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

export default IngredientsStock
