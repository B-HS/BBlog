import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import Blog from "./View/Blog";
import Login from "./View/Login";
import Portfolio from "./View/Portfolio";
import Read from "./View/Read";
import Resume from "./View/Resume";
import icon from "./assets/favicon.ico";
import ReadPortfolio from "./View/ReadPortfolio";

const App = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <link rel="icon" href={icon} />
                </Helmet>
            </HelmetProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Resume />}></Route>
                <Route path="/blog" element={<Blog />}></Route>
                <Route path="/portfolio" element={<Portfolio />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/read/:aid" element={<Read />}></Route>
                <Route path="/pf/:poid" element={<ReadPortfolio />}></Route>
            </Routes>
        </>
    );
};

export default App;
