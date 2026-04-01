export const initialState = {
  cart: []
};

export function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const exists = state.cart.find(item => item.id === action.payload.id);

      if (exists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }]
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    }

    case "UPDATE_QTY": {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        )
      };
    }

    default:
      return state;
  }
}