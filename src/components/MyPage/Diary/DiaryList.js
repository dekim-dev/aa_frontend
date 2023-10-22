import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDiaryList } from "../../../service/ApiService";
import { dateFormat } from "../../../utils/Functions";
import { Link } from "react-router-dom";

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
    font-weight: bold;
  }
  th,
  td {
    border-bottom: 1px solid grey;
    padding: 1rem 0.6rem;
  }
  th.createdAt,
  td.createdAt {
    width: 20%;
  }
  th.title,
  td.title {
    width: 30%;
  }
  th.conclusion,
  td.conclusion {
    width: 40%;
  }
  th.medicationLists,
  td.medicationLists {
    width: 10%;
  }
`;

const DiaryList = () => {
  const [diaryList, setDiaryList] = useState([]);

  const getDiaries = async () => {
    try {
      const response = await getDiaryList();
      console.log("🟢", response);
      setDiaryList(response.content);
    } catch (error) {
      console.log("🔴", error);
    }
  };

  useEffect(() => {
    getDiaries();
  }, []);

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th className="createdAt">날짜</th>
            <th className="title">제목</th>
            <th className="conclusion">한줄 요약</th>
            <th className="medicationLists">💊</th>
          </tr>
        </thead>
        <tbody>
          {diaryList.map((diary) => (
            <tr key={diary.id}>
              <td className="createdAt">{dateFormat(diary.createdAt)}</td>
              <td className="title">
                <Link to={`mypage/diary/${diary.id}`}>{diary.title}</Link>
              </td>
              <td className="conclusion">{diary.conclusion}</td>
              <td className="medicationLists">
                {diary.medicationLists.length > 0 ? "O" : "X"}
                {/* {diary.medicationLists.map((medication, index) => (
                  <div key={index}>
                    <p>{medication.med}</p>
                    <p>{medication.takenAt}</p>
                  </div>
                ))} */}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};
export default DiaryList;
