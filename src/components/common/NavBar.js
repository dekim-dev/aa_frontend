import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Symbol } from "./Logo";
import DropDown from "./Dropdown/Dropdown";
import SideBarIcon from "./SideBar";

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
  align-items: center;
  padding-bottom: 0.8rem;
  .boards {
    display: flex;
    gap: 3rem;
    justify-content: space-around;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:hover {
    font-weight: 700;
  }
  &.active {
    font-weight: 800;
    border-bottom: solid 2px;
    padding-bottom: 2px;
  }
`;

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log("📌isMobile: ", isMobile);

  return (
    <ParentContainer>
      <InnerConatiner>
        <div className="left_nav">
          {!isMobile ? <Symbol size={"4rem"} /> : <SideBarIcon />}
        </div>
        <div className="center_nav">
          {!isMobile ? (
            <ul className="boards">
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
          ) : (
            ""
          )}
        </div>

        <div className="right_nav">
          <DropDown />
        </div>
      </InnerConatiner>
    </ParentContainer>
  );
};

export default NavBar;
