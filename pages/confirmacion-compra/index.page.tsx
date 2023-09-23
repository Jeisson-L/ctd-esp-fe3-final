import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia"
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { useRouter } from "next/router";
import { Button, Card, CardContent } from "@mui/material";
import { useEffect } from "react";
import { removeCookie } from "dh-marvel/features/checkout/checkout.utils";

export default function ConfirmationOrder() {
    const router = useRouter();
    const { comicName, comicPrice, comicImage, customerName, addressShipping } = router.query;

    useEffect(() => {
        const cookieValue = document.cookie.replace(
            /(?:(?:^|.*;\s*)paymentCookie\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        console.log(cookieValue)
        if (cookieValue !== "true" || !comicName || !comicPrice || !comicImage || !customerName || !addressShipping) {
            router.push("/")
        }
    })

    const formatImage = () => {
        if (comicImage) {
            const index = comicImage.length - 3;
            return comicImage.slice(0, index) + "." + comicImage.slice(index)
        }
        return comicImage
    }

    const handleClick = () => {
        removeCookie('paymentCookie')
        router.push("/")
    }

    return (
        <LayoutCheckout>
            <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h2" color="green" textAlign={"center"}>
                    ¡Que disfrutes tu compra!
                </Typography>
                <Card sx={{ width: "auto", padding: 1, marginBottom: 1, marginTop: 1 }}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={formatImage()}
                        alt={comicName?.toString()}
                    />
                    <CardContent>
                        <Typography variant="h4" component="div">
                            {comicName}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {"Precio: $" + comicPrice}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {"A nombre de: " + customerName}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {"Dirección de entrega: " + addressShipping}
                        </Typography>
                    </CardContent>
                </Card>
                <Button variant="contained" onClick={handleClick} color="primary" size="large" sx={{ padding: 2 }}>
                    Seguir comprando
                </Button>
                <div></div>
            </Container>
        </LayoutCheckout>
    )

}