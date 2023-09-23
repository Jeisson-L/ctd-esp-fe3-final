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
    comic?: Comic
    showDetailButton: boolean
    isInStock: boolean
    showBuyButton: boolean
}

export const ComicBase: FC<Props> = ({ comic, showDetailButton, isInStock, showBuyButton }) => {

    const router = useRouter();

    const handleMoreClick = () => {
        router.push(`/comics/${comic?.id}`);
    };

    const handleBuyClick = () => {
        router.push(`/checkout?comicId=${comic?.id}`);
    };

    return (
        <>
            <Card sx={{ width: 360, maxWidth: 360, padding: 1, marginBottom: 1, marginTop: 1 }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={comic?.thumbnail.path.concat(".", comic?.thumbnail.extension)}
                    alt={comic?.title}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {comic?.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    {showBuyButton && (
                        <Button variant="contained" disabled={!isInStock} onClick={handleBuyClick} color="primary">
                            {isInStock ? 'Comprar' : 'Sin stock disponible'}
                        </Button>)}
                    {showDetailButton && (
                        <Button onClick={handleMoreClick} variant="contained" color="secondary">
                            Ver detalle
                        </Button>)}

                </CardActions>
            </Card>
        </>
    )
}