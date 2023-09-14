import Card from "@mui/material/Card";
import { Comic } from "interface/comic";
import Image from "next/image";
import { FC } from "react";

interface Props {
    comic: Comic
}

export const ComicBase: FC<Props> = ({ comic }) => {

    return (
        <>
            <Card sx={{ width: "auto", maxWidth: 500, height: 500, padding: 3, marginBottom: 3, marginTop: 3 }}>
                <Image
                    width={250}
                    height={250}
                    src={comic?.thumbnail.path.concat(".", comic?.thumbnail.extension)}
                    alt={comic.title}
                />
            </Card>
        </>
    )
}