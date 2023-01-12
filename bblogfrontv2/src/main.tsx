import { ChakraProvider, Container } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.sass";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <BrowserRouter>
                <Container maxW="1024px" minWidth="400px" marginBottom="2rem" p={0}>
                    <App />
                </Container>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);
