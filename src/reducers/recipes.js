const {
  DELETE_RECIPES_SUCCESS,
  FETCH_ALL_RECIPES_SUCCESS,
  CREATE_RECIPE_SUCCESS,
} = require("shared/constants/types")

const initialState = {}

const recipes = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ALL_RECIPES_SUCCESS:
      return {
        ...state,
        allRecipes: payload,
        fetchTimestamp: new Date(),
      }
    case DELETE_RECIPES_SUCCESS:
      const { id } = payload
      return {
        ...state,
        allRecipes: state.allRecipes.filter((recipe) => id !== recipe.id),
      }
    case CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        allRecipes: [state.allRecipes, payload],
      }
    default:
      return state
  }
}

export default recipes
