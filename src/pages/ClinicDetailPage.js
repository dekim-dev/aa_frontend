import { useEffect, useState } from "react";
import styled from "styled-components";
import ClinicInfo from "../components/Clinic/Detail/ClinicInfo";
import KakaoMap from "../components/Clinic/Detail/KakaoMap";
import CommentViewer from "../components/Post/Comment/CommentViewer";
import CommentEditor from "../components/Post/Comment/CommentEditor";
import { useParams } from "react-router-dom";
import { getClinicInfoById } from "../service/ApiService";

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
  .comment_wrapper {
    width: 88%;
  }
`;

const ClinicDetailPage = () => {
  const { clinicId } = useParams();
  const [clinicInfo, setClinicInfo] = useState({});
  const [schedule, setSchedule] = useState();
  const [kakaoMapInfo, setKakaoMapInfo] = useState({});

  useEffect(() => {
    const getClinicInfo = async () => {
      try {
        const response = await getClinicInfoById(clinicId);
        console.log(response);
        setClinicInfo(response);
        setSchedule(response.scheduleJson);

        setKakaoMapInfo({
          latitude: response.latitude,
          longitude: response.longitude,
          name: response.name,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getClinicInfo();
  }, [clinicId]);

  return (
    <ParentWrapper>
      <section>
        <h2 className="section_title">📌 병원 정보</h2>
        <ClinicInfo clinicInfo={clinicInfo} schedule={schedule} />
      </section>
      <section>
        <h2 className="section_title">📍 지도에서 보기</h2>
        <KakaoMap {...kakaoMapInfo} />
      </section>
      <div className="comment_wrapper">
        {/* <CommentViewer /> */}
        <CommentEditor />
      </div>
    </ParentWrapper>
  );
};
export default ClinicDetailPage;
