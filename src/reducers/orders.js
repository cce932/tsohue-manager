import { FETCH_ALL_ORDERS_SUCCESS } from "shared/constants/types"

const initialState = { allOrders: [] }

const orders = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        allOrders: payload,
        fetchTimestamp: new Date(),
      }
    default:
      return state
  }
}

export default orders
