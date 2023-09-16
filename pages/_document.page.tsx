import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html style={{ height: '100%' }}>
            <title> Marvel Store </title>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=optional" rel="stylesheet" />
                <meta name="description" content='Proyecto Final de Front End 3 cursado en DH que trata de una tienda online de Marvel'></meta>
            </Head>
            <body style={{ height: '100%' }}>
                <Main />
                <NextScript />
            </body>

        </Html>
    )
}