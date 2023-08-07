import { useState } from "react";
import styled from "styled-components";
import InputField from "./common/TextField";
import Button from "./common/Button";
import { signup } from "../service/ApiService";

const ParentWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
`;

const JoinForm = () => {
  const [state, setState] = useState({
    email: "",
    nickname: "",
    pwd: "",
    confPwd: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleJoin = () => {
    const requestData = {
      email: state.email,
      nickname: state.nickname,
      password: state.pwd,
    };

    signup(requestData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <ParentWrapper>
      <InputField
        type={"email"}
        name="email"
        label={"이메일 주소"}
        value={state.email}
        placeholder={"이메일주소를 입력하세요."}
        onChange={handleChangeState}
        helperText={""}
        width="80%"
      />
      <InputField
        type={"text"}
        name="nickname"
        label={"닉네임"}
        value={state.nickname}
        placeholder={"닉네임을 입력하세요."}
        onChange={handleChangeState}
        helperText={""}
        width="80%"
      />
      <InputField
        type={"password"}
        name="pwd"
        label={"비밀번호"}
        value={state.pwd}
        placeholder={"비밀번호를 입력하세요."}
        onChange={handleChangeState}
        helperText={""}
        width="80%"
      />
      <InputField
        type={"password"}
        name="confPwd"
        label={"비밀번호 확인"}
        value={state.confPwd}
        placeholder={"비밀번호를 재입력 하세요."}
        onChange={handleChangeState}
        helperText={""}
        width="80%"
      />
      <Button
        width="70%"
        height="2rem"
        fontSize="1.5rem"
        padding="10px 20px"
        onClick={handleJoin}
      >
        회 원 가 입
      </Button>
    </ParentWrapper>
  );
};
export default JoinForm;
