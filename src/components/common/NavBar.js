import React from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { Symbol } from "./Logo";
import PofileImg from "../../assets/images/profile.jpeg";

const ParentContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1rem;
  padding-top: 1rem;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  position: sticky;
  top: 0;
  z-index: 2;
  @media screen and (max-width: 768px) {
  }
`;
const InnerConatiner = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.8rem;
  ul {
    display: flex;
    gap: 3rem;
    justify-content: space-around;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &:hover {
    font-weight: 700;
  }
  &.active {
    font-weight: 800;
    border-bottom: solid 3px;
    padding-bottom: 4px;
  }
`;

// Keyframes 정의
const borderAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;
const ProfileIcon = styled.div`
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 3px solid #ececec;
    cursor: pointer;
    transition: transform 0.3s; /* 애니메이션을 부드럽게 하기 위한 설정 */
  }
  &:hover {
    animation: ${borderAnimation} 0.5s ease-in-out; /* 애니메이션을 적용 */
  }
`;

const NavBar = () => {
  return (
    <ParentContainer>
      <InnerConatiner>
        <Symbol size={"4rem"} />
        <ul className="isWeb">
          <li>
            <StyledNavLink to="/board1">게시판1</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/board2">게시판2</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/board3">게시판3</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/board4">게시판4</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/board5">게시판5</StyledNavLink>
          </li>
        </ul>
        <ProfileIcon>
          <img src={PofileImg} alt="profile" />
        </ProfileIcon>
      </InnerConatiner>
    </ParentContainer>
  );
};

export default NavBar;
