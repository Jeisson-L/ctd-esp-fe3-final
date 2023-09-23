import { removeCookie } from 'dh-marvel/features/checkout/checkout.utils';
import { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Document() {
    const router = useRouter();

    useEffect(() => {
        const { pathname } = router;

        if (!pathname.toLowerCase().includes("confirmacion-compra")) {
            removeCookie('paymentCookie')
        }
    })

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