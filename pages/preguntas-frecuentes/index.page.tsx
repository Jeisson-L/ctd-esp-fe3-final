import { FaqType } from "interface/faqs"
import { GetStaticProps, NextPage } from "next"
import { Faq } from "dh-marvel/components/faqs/faq.component"
import Container from "@mui/material/Container"

interface Props {
    faqs: FaqType[]
}

const FaqsPage: NextPage<Props> = ({ faqs }) => {
    return (
        <Container>
            <h1>Preguntas Frecuentes</h1>
            {faqs.map((faqData) => (
                <div key={faqData.id}>
                    <Faq faqData={faqData}></Faq>
                </div>
            ))}
        </Container>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const response = await fetch(`${process.env.URL_LOCAL}/api/faqs`)
    const faqs = await response.json()

    return {
        props: {
            faqs
        }
    }

}

export default FaqsPage