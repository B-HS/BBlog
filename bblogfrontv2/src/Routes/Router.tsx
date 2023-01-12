import { Route, Routes } from "react-router-dom";
import Blog from "../View/Blog";
import Login from "../View/Login";
import Portfolio from "../View/Portfolio";
import Read from "../View/Read";
import ReadPortfolio from "../View/ReadPortfolio";
import Resume from "../View/Resume";
import Write from "../View/Write";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Resume />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/portfolio" element={<Portfolio />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/write" element={<Write />}></Route>
            <Route path="/read/:aid" element={<Read />}></Route>
            <Route path="/pf/:poid" element={<ReadPortfolio />}></Route>
        </Routes>
    );
};

export default Router;
