import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPost from "./pages/DetailPost";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Lists from "./pages/Lists";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/post/:id" element={<DetailPost />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path="/messages" element={<Messages />} />
        <Route exact path="/lists" element={<Lists />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;