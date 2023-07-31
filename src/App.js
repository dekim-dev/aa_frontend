import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import JoinPage from "./components/pages/JoinPage";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    box-sizing: border-box;
    font-family: "NanumSquareNeo";
    text-decoration: none;
    list-style: none;
    a {
      text-decoration: none;
      color: black;
      &:visited {
        color: black
      }
    }
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
