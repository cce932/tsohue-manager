import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory from "react-bootstrap-table2-filter"

import "shared/style/components/tableWithFilterByCol.scss"
import { FiMinusCircle, FiAlertCircle } from "react-icons/fi"
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa"
import color from "shared/style/color"

// 有頁數 可選擇每頁顯示幾個
const TableWithFilterByCol = ({
  keyField,
  data,
  columns,
  cellEdit = {},
  selectRow = {},
  expandRow = {},
  rowEvents = {},
  hover = false,
}) => {
  const pagination = paginationFactory({
    sizePerPageList: [
      { text: "少", value: 13 },
      { text: "多", value: 18 },
      { text: "全部", value: data.length },
    ],
    hidePageListOnlyOnePage: true,
    sizePerPageRenderer,
  })

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

  expandRow =
    Object.keys(expandRow).length !== 0
      ? {
          ...expandRow,
          expandColumnPosition: "left",
          expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) {
              return <label>收合</label>
            }
            return <label>詳細</label>
          },
          expandColumnRenderer: ({ expanded }) => {
            if (expanded) {
              return (
                <FiMinusCircle
                  stroke={color.accent}
                  size="20px"
                />
              )
            }
            return (
              <FiAlertCircle
                stroke={color.accentLighter2}
                size="20px"
              />
            )
          },
        }
      : {}

  return (
    <>
      <BootstrapTable
        keyField={keyField}
        data={data}
        columns={columns}
        selectRow={selectRow}
        bordered={false}
        noDataIndication="空空如也 ~"
        pagination={pagination}
        filter={filterFactory()}
        sort={sortOption}
        cellEdit={cellEdit}
        expandRow={expandRow}
        rowEvents={rowEvents}
        hover={hover}
      />
      <label className="dataLength">共 {data.length} 筆</label>
    </>
  )
}

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange,
}) => (
  <div className="btn-group" role="group">
    {options.map((option) => {
      const isSelect = currSizePerPage === `${option.page}`
      return (
        <button
          key={option.text}
          type="button"
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${isSelect ? "selected" : ""}`}
        >
          {option.text}
        </button>
      )
    })}
  </div>
)

export default TableWithFilterByCol
