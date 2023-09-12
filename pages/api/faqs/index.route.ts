import { faqsData } from 'dh-marvel/components/faqs/faqsData'
import { FaqType } from 'interface/faqs'
import { NextApiRequest, NextApiResponse } from 'next'

type Data = FaqType[] | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (req.method === "GET") {
        res.status(200).json(faqsData)
    } else {
        res.status(400).json({ message: "Método no permitido" })
    }

}