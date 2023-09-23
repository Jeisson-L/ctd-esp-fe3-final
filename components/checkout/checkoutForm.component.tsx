import React, { useEffect, useState } from 'react';
import { FC } from "react";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ShippingDataForm } from './shippingDataForm.component';
import { PersonalDataForm } from './personalDataForm.component';
import { PayDataForm } from './payDataForm.component';
import { CheckoutDataForm, CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';
import { createCheckoutInput, defaultCheckoutDataForm, normalizeCheoutInfoToSend } from 'dh-marvel/features/checkout/checkout.utils';
import { Comic } from 'interface/comic';
import { fetchCheckoutApi } from 'dh-marvel/services/checkout/checkout.service';
import { Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/router';

interface Props {
    comic?: Comic
}

export const CheckoutForm: FC<Props> = ({ comic }) => {
    const defaultValues = defaultCheckoutDataForm();
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [dataForm, setDataForm] = useState(defaultValues);
    const [apiMessage, setApiMessage] = useState("")

    const saveData = (data: Object) => {
        setDataForm({ ...dataForm, ...data })
    }

    const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1); };

    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };

    const handleFinalizePurchase = async (data: object) => {

        const complitedData = normalizeCheoutInfoToSend(dataForm, data, comic);
        const checkoutInput: CheckoutInput = createCheckoutInput(complitedData as CheckoutDataForm)
        const apiResponse = await fetchCheckoutApi(checkoutInput)
        const bodyResponse = await apiResponse.json()

        if (apiResponse.ok) {
            routeToConfirmationPage(bodyResponse);
        } else {
            setApiMessage(bodyResponse.message as string);
        }
    }

    const routeToConfirmationPage = (bodyResponse: any) => {
        document.cookie = "paymentCookie=true; path=/"

        router.push(
            {
                pathname: "/confirmacion-compra",
                query: {
                    comicName: bodyResponse.data.order.name,
                    comicImage: bodyResponse.data.order.image,
                    comicPrice: bodyResponse.data.order.price,
                    customerName: bodyResponse.data.customer.name,
                    addressShipping: bodyResponse.data.customer.address.address1,
                },
            },
            "/confirmacion-compra"
        );
    }

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return <PersonalDataForm saveDataOnSubmit={saveData} nextAction={handleNext} previusAction={handleBack} defaultValues={dataForm} />;
            case 1:
                return <ShippingDataForm saveDataOnSubmit={saveData} nextAction={handleNext} previusAction={handleBack} defaultValues={dataForm} />;
            case 2:
                return <PayDataForm saveDataOnSubmit={saveData} nextAction={handleFinalizePurchase} previusAction={handleBack} defaultValues={dataForm} />
            default:
                return null;
        }
    };

    const steps = ['Datos Personales', 'Dirección de Entrega', 'Datos del Pago'];

    return (
        <Container sx={{ maxWidth: "xl" }} >
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {getStepContent(activeStep)}
            </div>
            <div>
                <Snackbar open={!!apiMessage} autoHideDuration={6000} onClose={() => { setApiMessage("") }}>
                    <Alert onClose={() => { setApiMessage("") }} severity="error" sx={{ width: '100%' }}>
                        {apiMessage}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    )
}