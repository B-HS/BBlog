import { ChakraProvider, Container } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { Header } from "../Components/Header/Header";
import wrapper from "../Store/store";
import "./index.sass";

import { Hahmlet, Saira } from "@next/font/google";
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
                    <Container maxW="1024px" minWidth="400px" marginBottom="2rem" p={0}>
                        <Header />
                        <Component {...props.pageProps} />
                    </Container>
                </ChakraProvider>
            </Provider>
        </>
    );
};
export default MyApp;
