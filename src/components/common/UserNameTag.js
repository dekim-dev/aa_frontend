import styled from "styled-components";

const ParentWrapper = styled.div`
  img {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
  }
`;

export const UserNicknameBar = ({ userNickname }) => {
  return <ParentWrapper>{userNickname}</ParentWrapper>;
};

export const UserPfImgBar = ({ userPfImg }) => {
  return (
    <ParentWrapper>
      <img src={userPfImg} alt="pfImg"></img>
    </ParentWrapper>
  );
};
