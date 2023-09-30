import { Route, Routes } from "react-router-dom";
import AdminNav from "../components/Admin/AdminNav";
import UserManagement from "../components/Admin/UserManagement";
import styled from "styled-components";

const ParentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const AdminPage = () => {
  return (
    <ParentWrapper>
      <AdminNav />
      <Routes>
        <Route path="/" element={<UserManagement />} />
      </Routes>
    </ParentWrapper>
  );
};
export default AdminPage;
