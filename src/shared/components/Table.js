import { AiOutlineDelete } from "react-icons/ai"
import "shared/style/components/table.scss"

export const Row = ({ id, category, name, quantityRequired, remove }) => (
  <tr>
    <td>{id}</td>
    <td>{category}</td>
    <td>{name}</td>
    <td>{quantityRequired}</td>
    <td className="remove">
      <a href="#" onClick={() => remove(id)}>
        &ensp;
        <AiOutlineDelete fill="rgb(231, 104, 69)" />
      </a>
    </td>
  </tr>
)

const Table = ({ data, sortBy, remove }) => {
  console.log("table type", !!data, data)
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => sortBy("id", data)}>ID</th>
          <th onClick={() => sortBy("category", data)}>種類</th>
          <th onClick={() => sortBy("name", data)}>名稱</th>
          <th onClick={() => sortBy("quantityRequired", data)}>數量</th>
          <th className="remove">刪除</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((item, index) => (
            <Row key={index} {...item} remove={remove} />
          ))
        ) : (
          <tr>
            <td>您尚未加入食材～</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table
