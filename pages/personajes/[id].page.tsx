import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card";
import { GetServerSideProps, NextPage } from "next";
import { getCharacter, getComic } from "dh-marvel/services/marvel/marvel.service";
import { Character, Comic } from "interface/comic";
import CardMedia from "@mui/material/CardMedia"
import { useRouter } from "next/router";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

interface Props {
    character: Character
}


const ComicDetails: NextPage<Props> = ({ character }) => {
    return (
        <LayoutGeneral>
            <Container sx={{ maxWidth: 800 }}>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Typography variant="h2" component="div" align="center">{character?.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ alignItems: "center" }} display={"grid"} justifyItems={"center"}>
                        <Card sx={{ width: "auto", maxWidth: 500, padding: 1, marginBottom: 1, marginTop: 1 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={character?.thumbnail.path.concat(".", character?.thumbnail.extension)}
                                alt={character?.name}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {character?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {character?.description}
                                </Typography>
                            </CardContent>
                        </Card>
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
    const character = await getCharacter(Number(id))
    return {
        props: {
            character
        }
    }

}

export default ComicDetails