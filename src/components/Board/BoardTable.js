import React from "react";
import styled from "styled-components";
import { posts } from "../../DummyData";
import { Link } from "react-router-dom";
import useWindowResize from "../../utils/useWindowResize";

const StyledTable = styled.table`
  margin: 0 auto;
  width: 80%;
  border-collapse: collapse;
  text-align: center;
  thead {
    border-top: 1px solid #000;
  }
  tbody tr:hover {
    background-color: #ececec;
  }
  th,
  td {
    border-bottom: 1px solid grey;
    padding: 1rem 0.6rem 1rem 0.6rem;
  }
  .title,
  .nickname {
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 300px;
    min-width: 20rem;
  }
  .nickname {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100px;
    min-width: 100px;
  }
  .createdAt,
  .likes,
  .viewCount {
    max-width: 30px;
    min-width: 30;
  }
`;

const WebBoardTable = ({ boardName }) => {
  const filteredPosts = posts.filter(
    (post) => post.boardCategory === boardName
  );

  return (
    <>
      <div>
        <StyledTable>
          <thead>
            <tr>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>추천</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <td className="title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </td>
                <td className="nickname">{post.nickname}</td>
                <td className="createdAt">{post.createdAt}</td>
                <td className="viewCount">{post.viewCount}</td>
                <td className="likes">{post.likes}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </>
  );
};

const MobileWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  align-items: center;
  .col {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .map_container {
    padding-bottom: 1rem;
    border-bottom: 1px solid black;
    line-height: 1.4rem;
    cursor: pointer;

    &:first-child {
      border-top: 1px solid black;
      padding-top: 1rem;
    }
    .nickname {
      font-size: 1rem;
    }
  }
  .row {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    margin-left: 1rem;
    color: grey;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 280px;
    font-size: 1.1rem;
  }
  .likes {
    display: none;
  }
`;

const MobileBoardTable = ({ boardName }) => {
  const filteredPosts = posts.filter(
    (post) => post.boardCategory === boardName
  );
  return (
    <MobileWrapper>
      <div className="col">
        {filteredPosts.map((post) => (
          <Link className="map_container" to={`/post/${post.id}`} key={post.id}>
            <div>
              <p className="title">{post.title}</p>
              <div className="row">
                <p className="nickname">{post.nickname}</p>
                <p className="createdAt">{post.createdAt}</p>
                <p className="viewCount">조회 {post.viewCount}</p>
                <p className="likes">{post.likes}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </MobileWrapper>
  );
};

const BoardTable = ({ boardName }) => {
  const isMobile = useWindowResize();

  if (isMobile) {
    return <MobileBoardTable boardName={boardName} />;
  }
  return <WebBoardTable boardName={boardName} />;
};
export default BoardTable;
