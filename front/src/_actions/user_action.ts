import axios from "axios";
import { LOGIN_USER } from "./types";

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
