import { useEffect, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import Auth from "../../../hoc/auth";
function LandingPage(props: any): ReactElement<any, any> {
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get("/api/hello").then((res) => console.log(res));
  }, []);
  const onClickHandler = () => {
    dispatch(
      logoutUser().then((res) => {
        if (res.payload.success) {
          props.history.push("/login");
        } else {
          alert("로그아웃 하는데 실패 했습니다.");
        }
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
