import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { Comic } from "interface/comic";
import { ComicBase } from "dh-marvel/components/comics/comic.component";

interface Props {
    comic: Comic
}


const ComicDetails: NextPage<Props> = ({ comic }) => {
    const handleBuyClick = () => {
        // Código para realizar la compra
    };

    const isInStock = (comic?.stock || 0) > 0;

    return (
        <div>
            <ComicBase comic={comic} ></ComicBase>
            <Card sx={{ width: "auto", maxWidth: 500, padding: 1, marginBottom: 1, marginTop: 1 }}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {comic?.textObjects[0]?.text}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Precio: ${comic?.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Precio anterior: ${comic?.oldPrice}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!isInStock}
                        onClick={handleBuyClick}
                    >
                        {isInStock ? 'Comprar' : 'Sin stock disponible'}
                    </Button>
                    <Typography variant="h6" component="div">
                        Personajes asociados:
                    </Typography>
                    <ul>
                        {comic?.characters.items?.map((character, index) => (
                            <li key={index}>
                                <a href={character.resourceURI}>{character.name}</a>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const comics = await getComics();
    const paths = comics.data.results?.map((comic: Comic) => ({
        params: { id: comic.id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = Number(context.params?.id);
    const comic = await getComic(id)

    return {
        props: {
            comic
        }
    }
}

export default ComicDetails