import { Helmet, HelmetProvider } from "react-helmet-async";
import icon from "./assets/favicon.ico";
import { Header } from "./Components/Header/Header";
import Router from "./Routes/Router";

const App = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <link rel="icon" href={icon} />
                </Helmet>
            </HelmetProvider>
            <Header />
            <Router />
        </>
    );
};

export default App;
