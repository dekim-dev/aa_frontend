import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  allUserInfo,
  deleteMultipleUsers,
  updateUserInfo,
} from "../../service/AdminApiService";
import { dateFormat } from "../../utils/Functions";

const ParentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  .button_container {
    width: 94%;

    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
`;

const Table = styled.table`
  width: 90%;
  margin: 0 auto;
  tbody :hover {
    background-color: #ececec;
  }
  th,
  td {
    padding: 0.8rem;
    border-bottom: 1px solid black;
    text-align: center;
  }
`;

const MembershipStatus = {
  PAID: "PAID",
  UNPAID: "UNPAID",
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await allUserInfo();
      setUsers(response);
    } catch (error) {
      console.log("회원가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditedUser({ ...user }); // 수정 중인 사용자 정보를 복사하여 초기화
  };

  const handleSaveClick = async () => {
    try {
      await updateUserInfo(editedUser);
      setEditingUser(null);
      setEditedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("회원 정보 업데이트 실패", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const toggleCheckbox = (userId) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  const handleDeleteSelectedUsers = async () => {
    try {
      await deleteMultipleUsers(selectedUserIds);
      setSelectedUserIds([]);
      fetchUsers();
    } catch (error) {
      console.error("회원 삭제 실패", error);
    }
  };

  const handleSelectAll = () => {
    const allIds = users.map((user) => user.id);

    if (selectAll) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(allIds);
    }

    setSelectAll(!selectAll);
  };

  return (
    <>
      <ParentContainer>
        <Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectAll}
                />
              </th>
              <th>회원번호</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>가입일자</th>
              <th>멤버십</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox(user.id)}
                    checked={selectedUserIds.includes(user.id)}
                  />
                </td>
                <td>{user.id}</td>
                <td>
                  {editingUser === user ? (
                    <input
                      type="text"
                      name="nickname"
                      value={editedUser.nickname}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.nickname
                  )}
                </td>
                <td>
                  {editingUser === user ? (
                    <input
                      type="text"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>{dateFormat(user.regDate)}</td>
                <td>
                  {editingUser === user ? (
                    <select
                      name="isPaidMember"
                      value={editedUser.isPaidMember}
                      onChange={handleInputChange}
                    >
                      <option value={MembershipStatus.PAID}>멤버십</option>
                      <option value={MembershipStatus.UNPAID}>일반</option>
                    </select>
                  ) : (
                    user.isPaidMember
                  )}
                </td>
                <td>
                  {editingUser === user ? (
                    <button onClick={handleSaveClick}>저장</button>
                  ) : (
                    <button onClick={() => handleEditClick(user)}>수정</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="button_container">
          <button onClick={handleDeleteSelectedUsers}>회원 삭제</button>
        </div>
      </ParentContainer>
    </>
  );
};

export default UserManagement;
