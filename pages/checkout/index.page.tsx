import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CheckoutForm } from "dh-marvel/components/checkout/checkoutForm.component";
import { DetailComic } from "dh-marvel/components/comics/detailComic.component";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { useRouter } from "next/router";
import { ComicBase } from "dh-marvel/components/comics/comic.component";
import { useEffect, useState } from "react";
import { Comic } from "interface/comic";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { fetchCheckoutApi } from "dh-marvel/services/checkout/checkout.service";


export default function Checkout() {
    const router = useRouter();
    const { comicId } = router.query;
    const [comic, setComic] = useState<Comic>();

    const fetchComic = async (comicId: number) => {
        try {
            const data = await fetchCheckoutApi(comicId)
            setComic(data);
        } catch (error) {
            console.error('Error fetching comic:', error);
        }
    }
    useEffect(() => {
        comicId && fetchComic(Number(comicId))
    }, [comicId])

    return (
        <>
            <LayoutCheckout>
                <Container maxWidth="md">
                    <Typography align="center" variant="h2">
                        Checkout
                    </Typography>
                    <CheckoutForm />
                    <Grid container spacing={1} >
                        <Grid item xs={12}>
                            <Typography variant="h2" component="div" align="center">{comic?.title}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ComicBase comic={comic} showDetailButton={false} isInStock={false} showBuyButton={false} ></ComicBase>
                        </Grid>
                        <Grid item xs={12}>
                            <DetailComic comic={comic}></DetailComic>
                        </Grid>
                    </Grid>
                </Container>
            </LayoutCheckout>
        </>
    )
}