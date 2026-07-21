import { createContext,useContext, useReducer } from "react";
import { authReducer, initialState } from "../reducers/authReducer";

const AuthStateContext = createContext();
const AuthActionContext = createContext();
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext value={state}>
      <AuthActionContext value={dispatch}>{children}</AuthActionContext>
    </AuthStateContext>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error("useAuthState must be used inside AuthProvider");
  }

  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthActionContext);

  if (!context) {
    throw new Error("useAuthDispatch must be used inside AuthProvider");
  }

  return context;
};
