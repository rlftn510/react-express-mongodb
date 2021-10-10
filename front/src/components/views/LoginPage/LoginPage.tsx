import React, { useState } from "react";

function LoginPage() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("go");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button onSubmit={onSubmit}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
