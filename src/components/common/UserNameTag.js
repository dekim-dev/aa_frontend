import { useContext, useState } from "react";
import styled from "styled-components";
import { blockAUser, unblockAUser } from "../../service/ApiService";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const ParentWrapper = styled.div`
  img {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
  }
  cursor: pointer;
  position: relative;
  .nickname_wrapper {
    &:hover {
      font-weight: bold;
    }
  }
  @media screen and (max-width: 768px) {
    color: black;
  }
`;

const DropdownMenu = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  top: 1.4rem;
  left: 1rem;
  border: 1px solid gray;
  background: #ececec;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1;
  width: 8rem;
  text-align: center;
  p {
    border-bottom: 1px solid gray;
    padding: 0.4rem;
    font-size: 0.8rem;
    &:hover {
      font-weight: bold;
    }
  }
  p:last-child {
    border-bottom: none;
  }
  @media screen and (max-width: 768px) {
    width: 7rem;
  }
`;

export const UserNicknameBar = ({ userNickname, userId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setBlockedUsers } = useContext(UserContext);
  const { postId } = useParams();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(userNickname);
    console.log(userId);
  };

  const handleUserBlock = async () => {
    const confirmBlock = window.confirm(
      `"${userNickname}" 회원님을 차단하시겠습니까?`
    );
    if (confirmBlock) {
      try {
        const response = await blockAUser(userId);
        console.log(response);

        if (response === "회원 차단 완료") {
          console.log(response);
          alert("차단이 완료되었습니다.");
          setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, userId]);
          window.location.reload();
          // navigate(`/post/${postId}`);
          console.log(postId);
        } else {
          alert(response.data.message);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ParentWrapper>
      <div className="nickname_wrapper" onClick={toggleDropdown}>
        {userNickname}
      </div>
      <DropdownMenu className="dropdownMenu_wrapper" open={isDropdownOpen}>
        <p onClick={handleUserBlock}>회원 차단하기</p>
        <p>회원 신고하기</p>
      </DropdownMenu>
    </ParentWrapper>
  );
};

export const UserPfImgBar = ({ userPfImg }) => {
  return (
    <ParentWrapper>
      <img src={userPfImg} alt="pfImg" />
    </ParentWrapper>
  );
};

const BlockedUserWrapper = styled.div`
  cursor: pointer;
  text-align: center;
  color: gray;
  p {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  @media screen and (max-width: 768px) {
    margin-left: 0.6rem;
    font-size: 0.9rem;
    line-height: 1.4rem;
  }
`;

export const BlockedUser = ({ userId }) => {
  const { setBlockedUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  const handleClickBlockedUser = async () => {
    const confirmUnblock = window.confirm(`차단을 해제 하시겠습니까?`);
    if (confirmUnblock) {
      try {
        const response = await unblockAUser(userId);
        console.log(response);

        if (response === "회원 차단해제 완료") {
          console.log(response);
          alert("차단이 해제되었습니다.");
          setBlockedUsers((prevBlockedUsers) =>
            prevBlockedUsers.filter((id) => id !== userId)
          );
          window.location.reload();
          // navigate(`/post/${postId}`);
        } else {
          console.log(response);
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <BlockedUserWrapper>
      <p onClick={handleClickBlockedUser}>차단 해제</p>
    </BlockedUserWrapper>
  );
};
