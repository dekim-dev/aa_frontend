import JoinForm from "../JoinForm";
import { Symbol } from "../common/Logo.js";
import styled from "styled-components";

const ParentWrapper = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const JoinPage = () => {
  return (
    <ParentWrapper>
      <Symbol />
      <JoinForm />
    </ParentWrapper>
  );
};
export default JoinPage;
