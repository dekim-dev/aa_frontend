import React, { useContext, useState } from "react";
import InputField from "./common/TextField";
import Button from "./common/Button";
import styled from "styled-components";
import { signin, getUserInfo } from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ParentWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    pwd: "",
  });

  const { setUserPfImg, setUserId, setAuthority, setIsPaidMember, setIsLogin } =
    useContext(UserContext);

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const requestData = {
      email: state.email,
      password: state.pwd,
    };

    try {
      const response = await signin(requestData);
      alert(`로그인 되었습니다.`);
      console.log("로그인 response: ", response);

      // 프로필 정보를 가져오고 UserContext를 업데이트
      const userInfo = await getUserInfo();
      setUserId(userInfo.id);
      setUserPfImg(userInfo.pfImg);
      setAuthority(userInfo.authority);
      setIsPaidMember(userInfo.isPaidMember);
      setIsLogin(true);
      console.log(userInfo);
      console.log(UserContext);

      navigate("/");
    } catch (error) {
      alert("로그인에 실패했습니다.");
      console.error("Error signing up:", error);
    }
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
