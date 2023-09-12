import { FaqType } from "interface/faqs"
import { FC } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    faqData: FaqType
}

export const Faq: FC<Props> = ({ faqData }) => {
    return (<Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={faqData.id.toString()}
        >
            <Typography>{faqData.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
                {faqData.answer}
            </Typography>
        </AccordionDetails>
    </Accordion>
    )
}