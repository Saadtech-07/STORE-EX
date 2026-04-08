export const initialState = {
  cart: []
};

export function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
  const existing = state.cart.find(
    (item) => item.id === action.payload.id
  );

  if (existing) {
    return {
      ...state,
      cart: state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: item.qty + action.payload.qty }
          : item
      ),
    };
  }

  return {
    ...state,
    cart: [...state.cart, action.payload],
  };
}

    case "INCREASE": {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      };
    }

    case "DECREASE": {
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter(item => item.qty > 0)
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    }

    default:
      return state;
    
    case "CLEAR_CART":
      return {
        ...state,
        cart: []
      };  
    }
}