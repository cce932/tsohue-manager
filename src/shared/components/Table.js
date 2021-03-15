import { AiOutlineDelete } from "react-icons/ai"
import "shared/style/components/table.scss"

export const Row = ({ rowData, columns, remove }) => {
  // console.log("row data", rowData, columns, remove)
  return (
    <tr>
      {Object.keys(columns).map((col, index) => {
        return <td key={index}>{rowData[col]}</td>
      })}
      <td className="remove">
        <a href="#" onClick={() => remove(rowData["id"])}>
          &ensp;
          <AiOutlineDelete fill="rgb(231, 104, 69)" />
        </a>
      </td>
    </tr>
  )
}

const Table = ({ data, columns, sortBy = () => null, remove }) => {
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
