import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CheckoutForm } from "dh-marvel/components/checkout/checkoutForm.component";


export default function Checkout() {
    return (
        <>
            <main>
                <Container maxWidth="md">
                    <Typography align="center" variant="h2">
                        Checkout
                    </Typography>
                    <CheckoutForm />
                </Container>
            </main>
        </>
    )
}