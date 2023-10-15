import { useState } from "react";
import { styled } from "styled-components";
import { createDiary } from "../../../service/ApiService";

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
  const [state, setState] = useState({
    title: "",
    content: "",
    conclusion: "",
    med: "",
    takenAt: "10:00", // 초기값 설정
    medicationList: [],
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMedication = () => {
    const { med, takenAt } = state;
    if (med) {
      const newMedication = {
        med,
        takenAt,
      };
      setState({
        ...state,
        med: "",
        medicationList: [...state.medicationList, newMedication],
      });
    }
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
    const requestData = {
      title: state.title,
      content: state.content,
      conclusion: state.conclusion,
    };

    try {
      const response = await createDiary(requestData);
      alert("다이어리가 등록되었습니다.");
    } catch (error) {
      console.error("다이어리 등록 에러", error);
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
