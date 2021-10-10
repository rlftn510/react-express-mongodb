import React, { useEffect } from "react";
import Axios from "axios";
function LandingPage() {
  useEffect(() => {
    Axios.get("/api/hello").then((res) => console.log(res));
  }, []);
  return <div>Landing!</div>;
}

export default LandingPage;
