import { getComics } from "dh-marvel/services/marvel/marvel.service"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        res.status(200).json(await getComics(undefined, 12))
    } else {
        res.status(400).json({ message: "Método no permitido" })
    }

}