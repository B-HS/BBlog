import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, Container } from "@chakra-ui/react";
import "./index.sass";
import { BrowserRouter } from "react-router-dom";



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
