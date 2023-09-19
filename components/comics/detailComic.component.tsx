import { Comic } from "interface/comic"
import React from "react"
import { FC } from "react"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card";
import { useRouter } from "next/router";

interface Props {
    comic?: Comic
}

export const DetailComic: FC<Props> = ({ comic }) => {
    const route = useRouter()

    return (
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
                {((comic?.characters.items?.length == undefined ? 0 : comic?.characters.items?.length) > 0 && (
                    <Typography variant="h6" component="div">
                        Personajes asociados:
                    </Typography>))}
                <ul>
                    {comic?.characters.items?.map((character, index) => (
                        <li key={index}>
                            <a href={route.basePath + "/personajes/" + character.resourceURI.split("/").pop()}>{character.name}</a>

                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )

}