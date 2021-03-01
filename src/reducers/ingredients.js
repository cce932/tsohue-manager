const {
  DELETE_INGREDIENT_SUCCESS,
  FETCH_ALL_INGREDIENTS_SUCCESS,
} = require("shared/constants/types")

const initialState = {}

const ingredients = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ALL_INGREDIENTS_SUCCESS:
      return {
        ...state,
        allIngredients: payload,
        fetchTimestamp: new Date(),
      }
    case DELETE_INGREDIENT_SUCCESS:
      const { id } = payload
      return {
        ...state,
        allIngredients: state.allIngredients.filter(
          (ingredient) => id !== ingredient.id
        ),
      }
    default:
      return state
  }
}

export default ingredients
