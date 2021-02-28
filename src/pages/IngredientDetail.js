
const IngredientDetail = (props) => {
  const ingredientId = props.match.params.id
  return <div>IngredientDetail!! {ingredientId}</div>
}

export default IngredientDetail