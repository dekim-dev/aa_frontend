import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClinicInfoById } from "../../../service/ApiService";
import styled from "styled-components";
import OpenHours from "./OpenHours";

const ParentContainer = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  .toggle_schedule {
    cursor: pointer;
    &:hover {
      background-color: #ececec;
    }
  }
`;

const RotatableArrow = styled.span`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.rotate ? "rotate(180deg)" : "rotate(0deg)")};
`;

const ClinicInfo = ({ setKakaoMapInfo }) => {
  const { clinicId } = useParams();
  const [clinicInfo, setClinicInfo] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [toggleSchedule, setToggleSchedule] = useState(false);

  const getClinicInfo = async () => {
    try {
      const response = await getClinicInfoById(clinicId);
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

  useEffect(() => {
    getClinicInfo();
  }, []);

  const handleClickSchedule = () => {
    setToggleSchedule(!toggleSchedule);
  };

  return (
    <>
      {clinicInfo ? (
        <ParentContainer className="inside">
          <p>상호 : {clinicInfo.name}</p>
          <p>설명 : {clinicInfo.info}</p>
          <p>주소 : {clinicInfo.address}</p>
          <p>전화번호 : {clinicInfo.tel}</p>
          <p onClick={handleClickSchedule}>
            <div className="toggle_schedule">
              진료시간보기{" "}
              <RotatableArrow rotate={toggleSchedule}>🕰️</RotatableArrow>
            </div>
          </p>
          {toggleSchedule && <OpenHours schedule={schedule} />}
        </ParentContainer>
      ) : (
        <p>병원 정보를 불러오는 중입니다 🏥</p>
      )}
    </>
  );
};

export default ClinicInfo;
