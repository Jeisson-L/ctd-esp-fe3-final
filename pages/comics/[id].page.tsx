import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { GetServerSideProps, NextPage } from "next";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { Comic } from "interface/comic";
import { ComicBase } from "dh-marvel/components/comics/comic.component";
import { useRouter } from "next/router";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { DetailComic } from "dh-marvel/components/comics/detailComic.component";

interface Props {
    comic: Comic
}


const ComicDetails: NextPage<Props> = ({ comic }) => {
    const route = useRouter()

    const isInStock = (comic?.stock || 0) > 0;
    return (
        <LayoutGeneral>
            <Container sx={{ maxWidth: 800 }}>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Typography variant="h2" component="div" align="center">{comic?.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ComicBase comic={comic} showDetailButton={false} isInStock={isInStock} showBuyButton={true} ></ComicBase>
                    </Grid>
                    <Grid item xs={12}>
                        <DetailComic comic={comic}></DetailComic>
                    </Grid>
                </Grid>
            </Container >
        </LayoutGeneral>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
    const { id } = query;

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const comic = await getComic(Number(id))

    return {
        props: {
            comic
        }
    }

}

export default ComicDetails