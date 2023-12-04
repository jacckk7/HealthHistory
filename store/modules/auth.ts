import { User } from "../../Types";

// Schema / State

export interface AuthState {
  isLogged: boolean;
  access_token?: string;
  refresh_token?: string;
  user?: User;
}

const initialState: AuthState = {
  isLogged: false,
  access_token: undefined,
  refresh_token: undefined,
  user: undefined
};

// Action Types

export const LOGIN = "/api/auth/login";
export const LOGOUT = "api/auth/logout";

// Action Creators

interface LoginAction {
  type: typeof LOGIN;
  payload: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

interface LogoutAction {
  type: typeof LOGOUT;
}

type AuthActionTypes = LoginAction | LogoutAction;

export function login({
  user,
  access_token,
  refresh_token,
}: LoginAction["payload"]): AuthActionTypes {
  return { type: LOGIN, payload: { user, access_token, refresh_token } };
}

export function logout(): AuthActionTypes {
  return { type: LOGOUT };
}

// Reducer

export default function reducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload, isLogged: true };

    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        user: undefined,
        access_token: undefined,
        refresh_token: undefined,
      };

    default:
      return state;
  }
}