import { ChakraProvider, Container } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { Header } from "../Components/Header/Header";
import wrapper from "../Store/store";
import "./index.sass";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <ChakraProvider>
                <Container maxW="1024px" minWidth="400px" marginBottom="2rem" p={0} lang={"ko"}>
                    <Header />
                    <Component {...props.pageProps} />
                </Container>
            </ChakraProvider>
        </Provider>
    );
};
export default MyApp;
