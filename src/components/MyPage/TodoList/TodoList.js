import { styled } from "styled-components";
import StyledCalendar from "../StyledCalendar";
import DailyTodoList from "./DailyList";
import { useState } from "react";
import { getTodoItemsByDateRange } from "../../../service/ApiService";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 768px) {
  }
`;

const TodoList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyTodoItems, setDailyTodoItems] = useState([]); // 상태 추가
  const handleDateSelect = async (date) => {
    setSelectedDate(date);

    // 선택한 날짜의 자정 (00:00:00)
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    // 선택한 날짜의 자정부터 다음 날 자정 이전까지의 시간 (23:59:59)
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // API 호출 함수로 선택한 날짜 범위로 데이터 조회
    await getTodoItemsByDateRange(startDate, endDate)
      .then((response) => {
        // 조회한 데이터를 처리하는 로직 추가
        setDailyTodoItems(response);
        console.log("😁", response);
      })
      .catch((error) => {
        // 에러 처리 로직 추가
        console.log("😰", error);
      });
  };

  return (
    <ParentWrapper>
      <DailyTodoList
        selectedDate={selectedDate}
        dailyTodoItems={dailyTodoItems}
      />
      <StyledCalendar onDateSelect={handleDateSelect} />
    </ParentWrapper>
  );
};
export default TodoList;
