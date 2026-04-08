export const initialAuthState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: JSON.parse(localStorage.getItem("user")) ? true : false
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("user", JSON.stringify(action.payload));

      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    }

    case "LOGOUT": {
      localStorage.removeItem("user");

      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    }

    default:
    return state;
  }
  
}