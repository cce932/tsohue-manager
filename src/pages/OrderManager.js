import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter"
import { Redirect } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import filterFactory, { Comparator } from "react-bootstrap-table2-filter"
import moment from "moment"
import { FiMinusCircle, FiAlertCircle } from "react-icons/fi"
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa"
import { AiTwotoneEdit } from "react-icons/ai"

import "shared/style/orderManager.scss"
import { SolidSpan } from "shared/components/styled"
import sizePerPageRenderer from "shared/components/SizePerPageRenderer"
import { ExpandDiv, PrimaryStrokeBtn } from "shared/components/styled"
import { getAllOrders } from "actions/loadData"
import { getMeunName } from "shared/utility/common"
import { allPaths } from "shared/constants/pathname"
import {
  CANCELED,
  FINISH,
  orderStatusOptions,
  payWayOptions,
  serviceWayOptions,
  TO_CONFIRM,
  TO_DELIEVER,
} from "shared/constants/options"
import color from "shared/style/color"
import StyledSpinner from "shared/components/StyledSpinner"
import OrderedRecipe from "shared/components/OrderedRecipe"
import { updateOrderStatus } from "actions/editData"

const statusFormatter = (cell, row) => {
  const style = {
    padding: "3px 10px",
    margin: "0",
    fontSize: "0.9rem",
  }

  let backgroundColor = ""

  switch (row.status) {
    case TO_CONFIRM:
      backgroundColor = color.accent
      break
    case TO_DELIEVER:
      backgroundColor = color.prime
      break
    case FINISH:
      backgroundColor = color.secondary
      break
    case CANCELED:
      backgroundColor = color.third
      break

    default:
      backgroundColor = color.forth
      break
  }

  return orderStatusOptions[cell] ? (
    <SolidSpan
      {...{
        ...style,
        backgroundColor,
      }}
    >
      {orderStatusOptions[cell]}
    </SolidSpan>
  ) : (
    <span></span>
  )
}

const expandRow = {
  renderer: (row) => {
    return (
      <div className="detail">
        {row.orderItems.map((item) => (
          <OrderedRecipe
            key={item.id}
            {...{
              recipe: item.recipe,
              customize: item.customize,
              sum: item.itemPrice,
              recipeImage: item.recipeImage,
              isCustomize: item.isCustomze,
            }}
          />
        ))}
      </div>
    )
  },
  showExpandColumn: true,
  expandByColumnOnly: true,
  expandColumnPosition: "left",
  expandHeaderColumnRenderer: ({ isAnyExpands }) => {
    if (isAnyExpands) {
      return <label>收合</label>
    }
    return <label>詳細</label>
  },
  expandColumnRenderer: ({ expanded }) => {
    if (expanded) {
      return <FiMinusCircle stroke={color.accent} size="20px" />
    }
    return <FiAlertCircle stroke={color.accentLighter2} size="20px" />
  },
}

const OrderManager = () => {
  const dispatch = useDispatch()
  const { allOrders } = useSelector((state) => state.orders)
  const { isLoggedIn } = useSelector((state) => state.auth)
  // const addDialog = useDialogContext()

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const keyField = "id"

  const sortOption = {
    sortCaret: (order) => {
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
  let order_number_filter
  let member_id_filter
  let order_time_filter
  let pay_way_filter
  let service_way_filter
  let status_filter
  let sum_filter
  let transport_fee_filter
  let discount_filter

  const clearFilterHandler = () => {
    // bug: 資料動果就不能清除了
    typeof id_filter === "function" && id_filter("")
    typeof order_number_filter === "function" && order_number_filter("")
    typeof member_id_filter === "function" && member_id_filter("")
    typeof order_time_filter === "function" && order_time_filter("")
    typeof pay_way_filter === "function" && pay_way_filter()
    typeof service_way_filter === "function" && service_way_filter()
    typeof status_filter === "function" && status_filter()
    typeof sum_filter === "function" && sum_filter("")
    typeof transport_fee_filter === "function" && transport_fee_filter("")
    typeof discount_filter === "function" && discount_filter("")
  }

  const cellEdit = cellEditFactory({
    mode: "dbclick",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, col) => {
      if (oldValue !== newValue) {
        dispatch(updateOrderStatus(row.id, newValue))
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
      editable: false,
    },
    {
      dataField: "member.id",
      text: "會員",
      filter: textFilter({
        getFilter: (filter) => {
          order_number_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "orderNumber",
      text: "訂貨編號",
      filter: textFilter({
        getFilter: (filter) => {
          order_number_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "orderTime",
      text: "訂購時間",
      formatter: (cell) => moment(cell).format("YYYY-MM-DD HH:mm:ss"),
      filter: textFilter({
        getFilter: (filter) => {
          order_time_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "payWay",
      text: "支付方式",
      formatter: (cell) => payWayOptions[cell],
      filter: selectFilter({
        options: payWayOptions,
        getFilter: (filter) => {
          pay_way_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "serviceWay",
      text: "運送方式",
      formatter: (cell) => serviceWayOptions[cell],
      filter: selectFilter({
        options: serviceWayOptions,
        getFilter: (filter) => {
          service_way_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "status",
      text: (
        <>
          <AiTwotoneEdit fill={color.accent} size="18px" />
          {" 狀態"}
        </>
      ),
      formatter: statusFormatter,
      filter: selectFilter({
        options: orderStatusOptions,
        getFilter: (filter) => {
          status_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
      editor: {
        type: Type.SELECT,
        options: Object.keys(orderStatusOptions).map((key) => ({
          value: key,
          label: orderStatusOptions[key],
        })),
      },
    },
    {
      dataField: "sum",
      text: "總金額",
      filter: numberFilter({
        getFilter: (filter) => {
          sum_filter = filter
        },
        placeholder: "NTD",
      }),
      sort: true,
      defaultValue: { comparator: Comparator.EQ },
      editable: false,
    },
    {
      dataField: "transportFee",
      text: "運費",
      filter: textFilter({
        getFilter: (filter) => {
          transport_fee_filter = filter
        },
        placeholder: "NTD",
      }),
      sort: true,
      editable: false,
    },
    {
      dataField: "discount",
      text: "折抵",
      filter: textFilter({
        getFilter: (filter) => {
          discount_filter = filter
        },
        placeholder: "NTD",
      }),
      sort: true,
      editable: false,
    },
  ]

  return isLoggedIn ? (
    allOrders ? (
      <ExpandDiv className="orders">
        <div className="tools">
          <PrimaryStrokeBtn onClick={clearFilterHandler}>
            清除搜尋
          </PrimaryStrokeBtn>
        </div>

        <BootstrapTable
          keyField={keyField}
          data={allOrders}
          columns={columns}
          bordered={false}
          noDataIndication="空空如也 ~"
          pagination={paginationFactory({
            sizePerPageList: [
              { text: "少", value: 12 },
              { text: "多", value: 18 },
              { text: "全部", value: allOrders.length },
            ],
            hidePageListOnlyOnePage: true,
            sizePerPageRenderer,
          })}
          filter={filterFactory()}
          sort={sortOption}
          expandRow={expandRow}
          cellEdit={cellEdit}
        />
        <label className="dataLength">共 {allOrders.length} 筆</label>
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

export default OrderManager
