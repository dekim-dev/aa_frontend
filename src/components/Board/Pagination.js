import styled from "styled-components";

const ParentWapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;
const Pagination = () => {
  return (
    <ParentWapper>
      <p>≪ ＜ 1 2 3 4 5 ＞ ≫</p>
    </ParentWapper>
  );
};
export default Pagination;
