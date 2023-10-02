import { Route, Routes } from "react-router-dom";
import AdminNav from "../components/Admin/AdminNav";
import UserManagement from "../components/Admin/UserManagement";
import styled from "styled-components";
import ClinicManagement from "../components/Admin/ClinicManagement";
import AdManagement from "../components/Admin/AdManagement";

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
        <Route path="/clinic" element={<ClinicManagement />} />
        <Route path="/ad" element={<AdManagement />} />
      </Routes>
    </ParentWrapper>
  );
};
export default AdminPage;
