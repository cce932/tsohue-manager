import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import "shared/style/components/table.scss"

const Table = ({ data, columns }) => {
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectColumn: true,
    bgColor: "rgb(229, 234, 240)",
  }

  const pagination = paginationFactory({
    sizePerPageList: [
      { text: "15", value: 15 },
      { text: "20", value: 20 },
      { text: "All", value: data.length },
    ],
    hidePageListOnlyOnePage: true,
    sizePerPageRenderer,
  })

  return (
    <BootstrapTable
      keyField="account"
      data={data}
      columns={columns}
      selectRow={selectRow}
      bordered={false}
      noDataIndication="空空如也 ~"
      pagination={pagination}
    />
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

export default Table
