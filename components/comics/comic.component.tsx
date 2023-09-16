import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card";
import { Comic } from "interface/comic";
import { FC } from "react";
import { useRouter } from "next/router"

interface Props {
    comic: Comic
    showDetailButton: boolean
    isInStock: boolean
}

export const ComicBase: FC<Props> = ({ comic, showDetailButton, isInStock }) => {

    const router = useRouter();

    const handleMoreClick = () => {
        router.push(`/comics/${comic.id}`);
    };

    const handleBuyClick = () => {
        // Código para realizar la compra
    };

    return (
        <>
            <Card sx={{ width: "auto", maxWidth: 500, padding: 1, marginBottom: 1, marginTop: 1 }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={comic?.thumbnail.path.concat(".", comic?.thumbnail.extension)}
                    alt={comic.title}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {comic.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" disabled={!isInStock} onClick={handleBuyClick} color="primary">
                        {isInStock ? 'Comprar' : 'Sin stock disponible'}
                    </Button>
                    {showDetailButton && (
                        <Button onClick={handleMoreClick} variant="contained" color="secondary">
                            Ver detalle
                        </Button>)}

                </CardActions>
            </Card>
        </>
    )
}