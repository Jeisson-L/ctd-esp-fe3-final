import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card";
import { GetServerSideProps, NextPage } from "next";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { Comic } from "interface/comic";
import { ComicBase } from "dh-marvel/components/comics/comic.component";

interface Props {
    comic: Comic
}


const ComicDetails: NextPage<Props> = ({ comic }) => {

    const isInStock = (comic?.stock || 0) > 0;
    return (
        <Container sx={{ maxWidth: 800 }}>
            <Grid container spacing={1} >
                <Grid item xs={12}>
                    <Typography variant="h2" component="div" align="center">{comic?.title}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <ComicBase comic={comic} showDetailButton={false} isInStock={isInStock} ></ComicBase>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ maxWidth: 500, minWidth: 150, padding: 1, marginBottom: 1, marginTop: 1 }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" align="justify">
                                {comic?.textObjects[0]?.text}
                            </Typography>
                            <Typography variant="h6" component="div">
                                Precio: ${comic?.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Precio anterior: ${comic?.oldPrice}
                            </Typography>
                            {comic?.characters.items?.length > 0 && (
                                <Typography variant="h6" component="div">
                                    Personajes asociados:
                                </Typography>)}
                            <ul>
                                {comic?.characters.items?.map((character, index) => (
                                    <li key={index}>
                                        <a href={character.resourceURI}>{character.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container >
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