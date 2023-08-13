import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../../assets/images/profile.jpeg";
import NonMember from "../../../assets/images/nonMemberImg.svg";
import DropdownContent from "./DropdownMenu";

const DropDownWrapper = styled.div`
  position: relative;
`;

const ProfileIcon = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 3px solid #ececec;
  cursor: pointer;
  transition: transform 0.3s; /* 애니메이션을 부드럽게 하기 위한 설정 */
  &:hover {
    animation: zoomOut 0.5s ease-in-out; /* 애니메이션을 적용 */

    @keyframes zoomOut {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;
const DropDown = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const ATK = localStorage.getItem("ACCESS_TOKEN");
  const [dropDownView, setDropDownView] = useState(false);
  console.log(ATK);

  useEffect(() => {
    if (ATK === null || ATK === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }

    console.log("isLoggedIn 렌더링");
  }, [ATK]);

  return (
    <DropDownWrapper>
      <div>
        {isLoggedIn ? (
          <ProfileIcon
            src={ProfileImg}
            alt="userImg"
            onClick={() => setDropDownView(!dropDownView)}
          />
        ) : (
          <ProfileIcon
            src={NonMember}
            alt="nonUserImg"
            onClick={() => setDropDownView(!dropDownView)}
          />
        )}
      </div>
      {dropDownView && (
        <DropdownContent
          isLoggedIn={isLoggedIn}
          setDropDownView={() => setDropDownView(!dropDownView)}
        />
      )}
    </DropDownWrapper>
  );
};
export default DropDown;
