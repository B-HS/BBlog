import Switch from "@/component/float/switch";
import Theme from "@/component/float/theme";
import Header from "@/component/header/header";
import "@/locales/locales";
import { ChakraProvider, ColorModeScript, Container, theme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Hahmlet, Saira } from "next/font/google";
import { Provider } from "react-redux";
import "../styles/globals.sass";
import { AppProps } from "next/app";
import store from "@/store/store";
const hahmlet = Hahmlet({ subsets: ["latin"] });
const saira = Saira({ subsets: ["latin"] });

// _document에 적용했다 오류나서 옮김
// https://github.com/chakra-ui/chakra-ui/issues/7559
theme.config = { initialColorMode: "dark", useSystemColorMode: false };
theme.styles.global = {
    color: {},
    _dark: {
        bg: mode("#202020", "white"),
    },
};

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <style jsx global>{`
                * {
                    font-family: ${saira.style.fontFamily}, ${hahmlet.style.fontFamily}, sans-serif;
                }
            `}</style>
            <Provider store={store}>
                <ChakraProvider>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Header />
                    <Container maxW="1024px" minWidth="400px" p={0} px={0} mb={5} position={"relative"}>
                        <Component {...pageProps} />
                        <Theme />
                        <Switch />
                    </Container>
                </ChakraProvider>
            </Provider>
        </>
    );
};
export default App;
