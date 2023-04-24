import wrapper from "@/store/store";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Hahmlet, Saira } from "next/font/google";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Provider } from "react-redux";
import "../styles/globals.sass";
import Header from "@/component/header/header";
import "@/locales/locales";
import Theme from "@/component/float/theme";
import Switch from "@/component/float/switch";
const hahmlet = Hahmlet({ subsets: ["latin"] });
const saira = Saira({ subsets: ["latin"] });

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <>
            <style jsx global>{`
                * {
                    font-family: ${saira.style.fontFamily}, ${hahmlet.style.fontFamily}, sans-serif;
                }
            `}</style>
            <Provider store={store}>
                <ChakraProvider>
                    <Header />
                    <Container maxW="1024px" minWidth="400px" p={0} px={0} mb={5} position={"relative"}>
                        <Component {...props.pageProps} />
                        <Theme />
                        <Switch />
                    </Container>
                </ChakraProvider>
            </Provider>
        </>
    );
};
export default MyApp;
