import { useState } from "react";
import { styled } from "styled-components";
import { createDiary } from "../../../service/ApiService";

const ParentWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    height: 2rem;
  }
`;

const DiaryEditor = () => {
  const [state, setState] = useState({
    title: "",
    content: "",
    conclusion: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log("👉🏻", state);
  };

  const handleSubmit = async () => {
    const requestData = {
      title: state.title,
      content: state.content,
      conclusion: state.conclusion,
    };

    try {
      const response = await createDiary(requestData);
      console.log(response);
      alert("다이어리가 등록되었습니다.");
    } catch (error) {
      console.error("다이어리 등록 에러", error);
    }
  };

  return (
    <ParentWrapper>
      <h3>오늘의 일기</h3>
      <input
        type="text"
        name="title"
        onChange={handleChangeState}
        placeholder="일기의 제목을 입력하세요"
      />
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
        placeholder="오늘의 한줄 요약"
      />
      <button onClick={handleSubmit}>등 록</button>
    </ParentWrapper>
  );
};
export default DiaryEditor;
