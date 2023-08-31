import { useState } from "react";
import { styled } from "styled-components";
import { createPost } from "../../service/ApiService";
import { FreeBoardTopics, QnABoardTopics } from "./TopicSelectBox";
import { useNavigate } from "react-router-dom";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const StyledTextField = styled.input`
  border-radius: 6px;
`;
const StyledTextArea = styled.textarea`
  width: 300px;
  height: 500px;
  border-radius: 10px;
`;
const StyledButton = styled.button``;

const BoardSelectBox = ({ onChange }) => {
  return (
    <>
      <select onChange={onChange}>
        <option defaultChecked>게시판 선택</option>
        <option value={"free"}>자유게시판</option>
        <option value={"qna"}>질문게시판</option>
      </select>
    </>
  );
};

const PostEditor = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const handleBoardChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const requestData = {
      boardCategory: selectedBoard,
      topic: selectedTopic,
      title: state.title,
      content: state.content,
    };

    try {
      const response = await createPost(requestData);
      console.log(response);
      console.log(response.topic);
      navigate(`/post/${response.id}`);
    } catch (error) {
      console.error("글 등록 에러", error);
    }
  };
  return (
    <ParentWrapper>
      <div className="select_boxes">
        <BoardSelectBox onChange={handleBoardChange} />
        {selectedBoard === "free" && (
          <FreeBoardTopics onChange={handleTopicChange} />
        )}
        {selectedBoard === "qna" && (
          <QnABoardTopics onChange={handleTopicChange} />
        )}
      </div>
      <StyledTextField
        label="글 제목"
        type="text"
        name="title"
        value={state.title}
        onChange={handleChangeState}
        width="250px"
        placeholder="글 제목을 입력하세요"
      />
      <StyledTextArea
        name="content"
        value={state.content}
        onChange={handleChangeState}
      />
      <StyledButton onClick={handleSubmit}>등 록</StyledButton>
    </ParentWrapper>
  );
};
export default PostEditor;
