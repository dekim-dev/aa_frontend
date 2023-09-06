import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [userPfImg, setUserPfImg] = useState("");
  const [userId, setUserId] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userPfImg,
        setUserPfImg,
        userId,
        setUserId,
        isLogin,
        setIsLogin,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
