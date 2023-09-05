import DiaryEditor from "./DiaryEditor";
import DiaryViewer from "./DiaryViewer";
import styled from "styled-components";

const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const DiaryList = () => {
  return (
    <ParentWrapper>
      <DiaryEditor />
      <DiaryViewer />
    </ParentWrapper>
  );
};
export default DiaryList;
