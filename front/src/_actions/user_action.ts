import axios from "axios";
import { LOGIN_USER, AUTH_USER, REGISTER_USER } from "./types";

// export interface TPayload {
//   type: string;
//   payload: Promise<any>;
// }
export async function loginUser(body: any) {
  const request = await axios.post("/api/users/login", body).then((res) => {
    return res.data;
  });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export async function registerUser(body: any) {
  const request = await axios.post("/api/users/register", body).then((res) => {
    return res.data;
  });

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export async function logoutUser() {
  const request = await axios.get("/api/users/logout").then((res) => {
    return res.data;
  });

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export async function auth() {
  const request = await axios.get("/api/users/auth").then((res) => {
    return res.data;
  });

  return {
    type: AUTH_USER,
    payload: request,
  };
}
