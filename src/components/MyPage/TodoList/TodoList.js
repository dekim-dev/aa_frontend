import { styled } from "styled-components";
import StyledCalendar from "../StyledCalendar";
import DailyTodoList from "./DailyList";
import { useState } from "react";
import { getTodoItemsByDate } from "../../../service/ApiService";

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
    await getTodoItemsByDate(date)
      .then((response) => {
        setDailyTodoItems(response);
        console.log("😁", response);
      })
      .catch((error) => {
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
