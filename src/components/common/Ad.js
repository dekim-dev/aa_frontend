import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";

const ParentWrapper = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ececec;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    width: 400px;
    height: 80px;
    margin-left: 10px;
  }
`;

const Ad = () => {
  const { authority, isPaidMember } = useContext(UserContext);

  if (authority === "ROLE_USER" && isPaidMember === "UNPAID") {
    return (
      <ParentWrapper>
        <img src="" alt="광고 이미지" />
        <img src="" alt="광고 이미지" />
      </ParentWrapper>
    );
  } else {
    return null;
  }
};
export default Ad;
