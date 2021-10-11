import { LOGIN_USER } from "../_actions/types";

export default function (state: any = {}, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    default:
      return state;
  }
}
