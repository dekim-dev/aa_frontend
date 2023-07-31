import LoginForm from "../LoginForm";
import { Logo } from "../common/Logo";
import styled from "styled-components";

const ParentWrapper = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoginPage = () => {
  return (
    <ParentWrapper>
      <Logo />
      <LoginForm />
    </ParentWrapper>
  );
};
export default LoginPage;
