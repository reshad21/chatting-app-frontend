import Homepage from "./home/Homepage";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./signup/SignUpPage";
import LoginPage from "./login/LoginPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
