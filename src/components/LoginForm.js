import React, { useState } from "react";
import InputField from "./common/TextField";
import Button from "./common/Button";
import styled from "styled-components";

const ParentWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoginForm = () => {
  const [state, setState] = useState({
    email: "",
    pwd: "",
  });

  const handleChangeState = (e) => {
    console.log("🍒 name: ", e.target.name);
    console.log("📝 value: ", e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    console.log("✨ 로그인 버튼 클릭");
  };

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <ParentWrapper>
      <InputField
        name="email"
        label={"이메일"}
        value={state.email}
        placeholder={"이메일을 입력하세요."}
        onChange={handleChangeState}
        width="14rem"
      />
      <InputField
        type={"password"}
        name="pwd"
        label={"비밀번호"}
        value={state.pwd}
        placeholder={"비밀번호를 입력하세요."}
        onChange={handleChangeState}
        onKeyDown={enterKeyEventHandler}
        width="14rem"
      />
      <Button
        width="10rem"
        height="2rem"
        fontSize="1.5rem"
        padding="10px 20px"
        onClick={handleLogin}
      >
        로 그 인
      </Button>
    </ParentWrapper>
  );
};
export default LoginForm;
