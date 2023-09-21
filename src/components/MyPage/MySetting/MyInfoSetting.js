import { useContext, useEffect, useState } from "react";
import {
  deleteUser,
  getUserInfoForUpdate,
  updateUserNickname,
  updateUserPfImg,
} from "../../../service/ApiService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ImgUploadButton from "../../common/ImgUploadButton";
import { UserContext } from "../../../context/UserContext";

const ParentWrapper = styled.div`
  width: 100%;
  .user_info_wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
  .email_notice {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 0.8rem;
    }
  }
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 20px;
  }
  input {
    width: 30%;
    height: 2rem;
  }
  .button_wrapper {
    margin: 0 auto;
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const MyInfoSetting = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [newNickname, setNewNickname] = useState("");
  const { setUserPfImg } = useContext(UserContext);

  const handleChangeNickname = (e) => {
    setNewNickname(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserInfoForUpdate();
        setUserInfo(response);
        setNewNickname(response.nickname);
        console.log(response);
      } catch (err) {
        console.log("회원 정보 불러오기 에러 : ", err);
      }
    };
    fetchData();
  }, []);

  const handleUpdateNickname = async () => {
    const requestData = { newNickname: newNickname };
    try {
      const response = await updateUserNickname(requestData);
      if (response) {
        console.log(response.data);
        console.log(response.status);

        alert("닉네임이 변경되었습니다.");
        // 닉네임 업데이트 성공 시 새로운 닉네임으로 상태 업데이트
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          nickname: newNickname,
        }));
        console.log("닉네임 업데이트 성공");
      } else {
        console.log("닉네임 업데이트 실패");
      }
    } catch (error) {
      console.error("닉네임 업데이트 오류: ", error);
    }
  };

  const handleUpdatePfImg = async (pfImgUrl) => {
    const requestData = { newPfImg: pfImgUrl };
    try {
      // 사용자 프로필 이미지 업데이트 요청
      const response = await updateUserPfImg(requestData);
      if (response) {
        console.log("프로필 이미지 업데이트 성공");
        // 프로필 이미지 URL을 상태로 설정
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          pfImg: pfImgUrl,
        }));
        setUserPfImg(pfImgUrl);
      } else {
        console.log("프로필 이미지 업데이트 실패");
      }
    } catch (error) {
      console.error("프로필 이미지 업데이트 오류: ", error);
    }
  };

  const handleClickWithdrawBtn = async () => {
    const confirmation = window.confirm("정말로 회원탈퇴 하시겠습니까?");
    if (confirmation) {
      try {
        const response = await deleteUser();
        if (response) {
          localStorage.clear();
          navigate("/", { replace: true });
          window.location.reload();
          alert("회원탈퇴가 완료되었습니다.");
          console.log("회원탈퇴 성공");
        } else {
          console.log("회원탈퇴 실패");
        }
      } catch (error) {
        console.error("회원탈퇴 오류: ", error);
      }
    } else {
      console.log("회원탈퇴가 취소되었습니다.");
    }
  };

  return (
    <ParentWrapper>
      <div className="user_info_wrapper">
        <img src={userInfo.pfImg} alt="user_pfImg" />
        <ImgUploadButton
          userId={userInfo.id}
          onImageUploaded={handleUpdatePfImg}
        />
        <input
          type="text"
          value={newNickname}
          onChange={handleChangeNickname}
        />
        <div className="email_notice">
          <input value={userInfo.email} readOnly />
          <p>이메일 변경은 관리자에게 문의해주세요.</p>
        </div>
      </div>
      <div className="button_wrapper">
        <button onClick={handleUpdateNickname}>수정</button>
        <button onClick={handleClickWithdrawBtn}>회원 탈퇴</button>
      </div>
    </ParentWrapper>
  );
};
export default MyInfoSetting;
