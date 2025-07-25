import { createContext, useEffect, useReducer } from "react";

// Safely parse stored user
let storedUser = null;
try {
  const raw = localStorage.getItem("user");
  if (raw && raw !== "undefined") {
    storedUser = JSON.parse(raw);
  }
} catch (e) {
  console.error("Failed to parse user from localStorage:", e.message);
  localStorage.removeItem("user");
}

const initial_state = {
  user: storedUser,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);


export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };

        case "LOGIN_SUCCESS":
            localStorage.setItem("user", JSON.stringify(action.payload)); // save on login
            return {
                user: action.payload,
                loading: false,
                error: null,
            };

        case "LOGIN_FAILURE":
        case "LOGOUT":
            localStorage.removeItem("user"); // clear on logout or failure
            return {
                user: null,
                loading: false,
                error: null,
            };

        case "REGISTER_SUCCESS":
            return {
                user: null,
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};


export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initial_state)

    return (
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}