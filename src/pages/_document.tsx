import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
    render() {
        return (
            <Html prefix="og: https://ogp.me/ns#">
                <Head>
                    <link rel="manifest" href="/manifest.json"/>
                    <link rel="icon" type="image/png" sizes="196x196" href="/img/pwa/pirates_square_196.png"/>
                    <link rel="apple-touch-icon" href="/img/pwa/g/apple-icon-180.png"/>
                    <meta name="mobile-web-app-capable" content="yes"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
