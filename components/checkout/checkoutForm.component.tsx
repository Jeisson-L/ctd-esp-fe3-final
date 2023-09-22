import React, { useEffect, useState } from 'react';
import { FC } from "react";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ShippingDataForm } from './shippingDataForm.component';
import { PersonalDataForm } from './personalDataForm.component';
import { PayDataForm } from './payDataForm.component';
import confetti from 'canvas-confetti'
import { CheckoutDataForm, CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';
import { createCheckoutInput, defaultCheckoutDataForm } from 'dh-marvel/features/checkout/checkout.utils';
import { Comic } from 'interface/comic';
import { fetchCheckoutApi } from 'dh-marvel/services/checkout/checkout.service';

interface Props {
    comic?: Comic
}

export const CheckoutForm: FC<Props> = ({ comic }) => {
    const defaultValues = defaultCheckoutDataForm();
    const [activeStep, setActiveStep] = useState(0);
    const [dataForm, setDataForm] = useState(defaultValues);

    const saveData = (data: Object) => {
        setDataForm({ ...dataForm, ...data })
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinalizePurchase = async (data: object) => {
        const complitedData = { ...dataForm, ...data }
        complitedData.orderName = comic ? comic.title : ""
        complitedData.orderImage = comic ? comic.thumbnail.path + comic.thumbnail.extension : ""
        complitedData.orederPrice = comic ? comic.price.toString() : ""
        const checkoutInput: CheckoutInput = createCheckoutInput(complitedData as CheckoutDataForm)


        const res = await fetchCheckoutApi(checkoutInput)
        console.log(res)
        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            },
        });
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
        </Container>
    )
}