import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { createDiary } from "../../../service/ApiService";
import { useNavigate } from "react-router-dom";

const ParentWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    height: 2rem;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
  .med_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

const DiaryEditor = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: "",
    content: "",
    conclusion: "",
    med: "",
    takenAt: "10:00",
    createdAt: "",
    medicationList: [],
  });

  // 오늘의 날짜를 YYYY-MM-DD 형식으로 가져오는 함수
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 오늘의 날짜로 초기화
    setState({
      ...state,
      createdAt: getTodayDate(),
    });
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMedication = () => {
    const { med, takenAt } = state;
    const newMedication = {
      med,
      takenAt,
    };
    setState({
      ...state,
      medicationList: [...state.medicationList, newMedication],
    });
  };

  const handleDeleteMedication = (index) => {
    const updatedMedicationList = [...state.medicationList];
    updatedMedicationList.splice(index, 1);
    setState({
      ...state,
      medicationList: updatedMedicationList,
    });
  };

  const handleSubmit = async () => {
    if (
      !state.title ||
      !state.content ||
      !state.conclusion ||
      state.medicationList.length === 0
    ) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }
    const localDateTimeString = new Date(state.createdAt).toISOString(); // 날짜를 문자열로 변환
    const requestData = {
      title: state.title,
      content: state.content,
      conclusion: state.conclusion,
      medicationLists: state.medicationList,
      createdAt: localDateTimeString,
    };

    try {
      const response = await createDiary(requestData);
      console.log("🟢다이어리 등록 완료: ", response);
      alert("다이어리가 등록되었습니다.");
      navigate(`mypage/diary/${response.id}`);
    } catch (error) {
      console.error("🔴다이어리 등록 에러: ", error);
    }
  };

  // 시간을 30분 간격으로 생성
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  return (
    <ParentWrapper>
      <h3 style={{ textAlign: "center" }}>오늘의 일기</h3>
      <input
        type="date"
        name="createdAt"
        onChange={handleChangeState}
        value={state.createdAt}
      />
      <input
        type="text"
        name="title"
        onChange={handleChangeState}
        placeholder="일기의 제목을 입력하세요"
      />
      <div className="med_wrapper">
        복용약:
        <input
          type="text"
          name="med"
          onChange={handleChangeState}
          placeholder="약 이름/용량"
        />
        <select
          name="takenAt"
          onChange={handleChangeState}
          value={state.takenAt}
        >
          {generateTimeOptions().map((timeOption) => (
            <option key={timeOption} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </select>
        <button onClick={handleAddMedication}>추가</button>
      </div>
      {state.medicationList.map((medication, index) => (
        <div key={index}>
          {medication.med} - {medication.takenAt}
          <button onClick={() => handleDeleteMedication(index)}>삭제</button>
        </div>
      ))}
      <textarea
        name="content"
        onChange={handleChangeState}
        placeholder="일기 본문을 입력하세요"
        style={{ width: "100%", height: "400px", padding: "0.4rem" }}
      />
      <input
        type="text"
        name="conclusion"
        onChange={handleChangeState}
        placeholder="오늘의 한줄!"
      />
      <button onClick={handleSubmit}>등 록</button>
    </ParentWrapper>
  );
};

export default DiaryEditor;
