import { useState } from "react";
import styled from "styled-components";
import ClinicInfo from "../components/Clinic/Detail/ClinicInfo";
import KakaoMap from "../components/Clinic/Detail/KakaoMap";

const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  section {
    width: 70%;
    .section_title {
      /* font-size: 1.5rem; */
      line-height: 2.5rem;
    }
  }
`;

const ClinicDetailPage = () => {
  const [kakaoMapInfo, setKakaoMapInfo] = useState({}); // KakaoMap 에게 줄 정보

  return (
    <ParentWrapper>
      <section>
        <h2 className="section_title">📌 병원 정보</h2>
        <ClinicInfo setKakaoMapInfo={setKakaoMapInfo} />
      </section>
      <section>
        <h2 className="section_title">📍 지도에서 보기</h2>
        <KakaoMap {...kakaoMapInfo} />
      </section>
    </ParentWrapper>
  );
};
export default ClinicDetailPage;
