import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPost from "./pages/DetailPost";
import Home from "./pages/Home";
import MyPost from "./pages/MyPost";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/post" element={<DetailPost />} />
            <Route exact path="/my-post" element={<MyPost />} />
            <Route exact path='/login' element={<LoginPage />}/>
            <Route exact path='/register' element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;