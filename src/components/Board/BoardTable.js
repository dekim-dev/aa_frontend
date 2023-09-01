import React from "react";
import styled from "styled-components";
import { posts } from "../../DummyData";
import { Link } from "react-router-dom";
import useWindowResize from "../../utils/useWindowResize";
import { topics } from "../Post/PostViewer";

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
    text-align: left;
    padding-left: 1rem;
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

const WebBoardTable = ({ postList }) => {
  console.log("🍒", postList);

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
            {postList.map((post) => (
              <tr key={post.id}>
                <td className="title">
                  [{topics[post.topic]}]{" "}
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </td>
                <td className="nickname">{post.nickname}</td>
                <td className="createdAt">{dateFormat(post.createdAt)}</td>
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

const MobileBoardTable = ({ postList }) => {
  return (
    <MobileWrapper>
      <div className="col">
        {postList.map((post) => (
          <Link className="map_container" to={`/post/${post.id}`} key={post.id}>
            <div>
              <p className="title">
                [{topics[post.topic]}] {post.title}
              </p>
              <div className="row">
                <p className="nickname">{post.nickname}</p>
                <p className="createdAt">{dateFormat(post.createdAt)}</p>
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

const BoardTable = ({ boardName, postList }) => {
  const isMobile = useWindowResize();

  if (isMobile) {
    return <MobileBoardTable boardName={boardName} postList={postList} />;
  }
  return <WebBoardTable boardName={boardName} postList={postList} />;
};
export default BoardTable;

const dateFormat = (inputDate) => {
  // Date 객체 생성
  const date = new Date(inputDate);

  // 년, 월, 일 추출
  const year = String(date.getFullYear()).slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 월과 일을 두 자리 문자열로 변환
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  const formattedDate = `${year}/${formattedMonth}/${formattedDay}`;
  return formattedDate;
};
