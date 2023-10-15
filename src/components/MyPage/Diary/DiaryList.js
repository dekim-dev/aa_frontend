import DiaryEditor from "./DiaryEditor";
import DiaryViewer from "./DiaryViewer";
import styled from "styled-components";
import LatestDiaryList from "./LatestDiaryList";

const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const DiaryList = () => {
  return (
    <ParentWrapper>
      <LatestDiaryList />
      <DiaryEditor />
      <DiaryViewer />
    </ParentWrapper>
  );
};
export default DiaryList;
