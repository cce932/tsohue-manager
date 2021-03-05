const {
  DELETE_RECIPES_SUCCESS,
  FETCH_ALL_RECIPES_SUCCESS,
  // ADD_RECIPES_SUCCESS,
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
    // case ADD_RECIPES_SUCCESS:
    //   return {
    //     ...state,
    //     allRecipes: state.allRecipes.concat(payload),
    //   }
    default:
      return state
  }
}

export default recipes
