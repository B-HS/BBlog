import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

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
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
