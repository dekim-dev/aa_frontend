import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";

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
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<JoinPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
