import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import "shared/style/components/table.scss"

export const Row = ({ rowData, columns, remove, editable, edit }) => {
  // console.log("row data", rowData, columns, remove, edit)
  return (
    <tr>
      {Object.keys(columns).map((col, index) => {
        return <td key={index}>{rowData[col]}</td>
      })}
      {editable && (
        <td className="edit">
          <button onClick={(e) => edit(rowData, e)}>
            &ensp;
            <AiOutlineEdit fill="#64d69f" size="20px" />
          </button>
        </td>
      )}
      <td className="remove">
        <button onClick={(e) => remove(rowData, e)}>
          &ensp;
          <AiOutlineDelete fill="rgb(231, 104, 69)" size="20px" />
        </button>
      </td>
    </tr>
  )
}

const Table = ({
  data,
  columns,
  sortBy = () => null,
  remove,
  editable = false,
  edit,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {Object.keys(columns).map((col, index) => {
            return (
              <th key={index} onClick={() => sortBy(col, data)}>
                {columns[col]}
              </th>
            )
          })}
          {editable && <th className="edit">編輯</th>}
          <th className="remove">刪除</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((rowData, index) => (
            <Row
              key={index}
              rowData={rowData}
              columns={columns}
              remove={remove}
              editable={editable}
              edit={editable ? edit : () => null}
            />
          ))
        ) : (
          <tr>
            <td>尚無資料～</td>
            {Object.keys(columns).map((col, index) => {
              return <td key={index}></td>
            })}
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table
