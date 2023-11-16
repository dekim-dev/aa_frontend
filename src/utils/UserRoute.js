import { Navigate, useLocation } from "react-router-dom";

const UserRoute = ({ children }) => {
  const location = useLocation();
  let token = localStorage.getItem("ACCESS_TOKEN");

  return token ? (
    children
  ) : (
    <>
      {alert("로그인이 필요합니다.")}
      <Navigate to="/signin" state={{ from: location }} replace />
    </>
  );
};

export default UserRoute;
