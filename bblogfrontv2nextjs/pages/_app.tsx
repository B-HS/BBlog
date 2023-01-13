import { ChakraProvider, Container } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { Header } from "../Components/Header/Header";
import wrapper from "../Store/store";
import "./index.sass";

function MyApp({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <ChakraProvider>
            <Provider store={store}>
                <Container maxW="1024px" minWidth="400px" marginBottom="2rem" p={0}>
                    <Header />
                    <Component {...props} />
                </Container>
            </Provider>
        </ChakraProvider>
    );
}
export default MyApp;
