const DateNotice = () => {
  let today = new Date();

  return (
    <>
      <h1>
        📅 {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일
      </h1>
    </>
  );
};

export default DateNotice;
