import { ColorModeScript, theme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
theme.config = { initialColorMode: "dark", useSystemColorMode: false };
theme.styles.global = {
    color: {},
    _dark: {
        bg: mode("#202020", "white")
    },
};
class MyDocument extends Document {
    render() {
        return (
            <Html lang="ko">
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
                </Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
