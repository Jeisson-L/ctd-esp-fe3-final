import React, { useState } from 'react';
import { FC } from "react";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ShippingDataForm } from './shippingDataForm.component';
import { PersonalDataForm } from './personalDataForm.component';
import { PayDataForm } from './payDataForm.component';
import LayoutCheckout from '../layouts/layout-checkout';

export const CheckoutForm: FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [dataForm, setDataForm] = useState({});

    const saveData = (data: Object) => {
        setDataForm({ ...dataForm, ...data })
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        console.log(dataForm)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return <PersonalDataForm saveDataOnSubmit={saveData} nextAction={handleNext} previusAction={handleBack} defaultValues={dataForm} />;
            case 1:
                return <ShippingDataForm saveDataOnSubmit={saveData} nextAction={handleNext} previusAction={handleBack} defaultValues={dataForm} />;
            case 2:
                return <PayDataForm saveDataOnSubmit={saveData} nextAction={handleNext} previusAction={handleBack} defaultValues={dataForm} />
            default:
                return null;
        }
    };

    const steps = ['Datos Personales', 'Dirección de Entrega', 'Datos del Pago'];

    return (
        <LayoutCheckout>
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
        </LayoutCheckout>
    )
}