import styled from "styled-components";

const DeleteButton = styled.button`
  margin-left: auto; /* 아이콘을 오른쪽 끝으로 정렬 */
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
`;

const ItemDeleteIcon = ({ itemId, handleDelete }) => {
  const handleDeleteClick = () => {
    handleDelete(itemId);
  };

  return <DeleteButton onClick={handleDeleteClick}>🗑</DeleteButton>;
};

export default ItemDeleteIcon;
