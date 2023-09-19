import React, { useState } from "react"
import { FC } from "react";
import Card from "react-credit-cards"
import 'react-credit-cards/es/styles-compiled.css';
import TextField from "@mui/material/TextField";
import { ErrorMessage } from '@hookform/error-message';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import { Grid } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { schemaPayData } from "rules";

interface PaylData {
    cardNumber: string,
    cardName: string,
    expirationDate: string,
    cvc: string,
}

export const PayDataForm: FC<any> = ({ saveDataOnSubmit, nextAction, previusAction, defaultValues }) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
        register
    } = useForm<PaylData>({ resolver: yupResolver(schemaPayData), defaultValues });

    const onSubmit = (data: any) => {
        saveDataOnSubmit(data);
        nextAction();
    };

    return (<>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid display={"flex"} alignItems={"center"} justifyItems={"space-around"}>
                <div className="credit-card-container" style={{ padding: "20px" }}>
                    <Card
                        number={watch("cardNumber", '')}
                        name={watch("cardName", '')}
                        expiry={watch("expirationDate", '')}
                        cvc={watch("cvc", '')}
                    />
                </div>
                <div style={{ padding: "20px" }}>
                    <Typography variant="caption" color="red">
                        <ErrorMessage errors={errors} name="cardNumber" />
                    </Typography>
                    <Controller
                        name="cardNumber"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...register("cardNumber")}
                                {...field}
                                type="tel"
                                label="Número de la tarjeta"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                error={errors.cardNumber ? true : false}
                            />
                        )}
                    />

                    <Typography variant="caption" color="red">
                        <ErrorMessage errors={errors} name="cardName" />
                    </Typography>
                    <Controller
                        name="cardName"
                        control={control}
                        defaultValue={""}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...register("cardName")}
                                {...field}
                                type="text"
                                label="Nombre del tarjetabiente"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                error={errors.cardName ? true : false}
                            />
                        )}
                    />
                    <Typography variant="caption" color="red">
                        <ErrorMessage errors={errors} name="expirationDate" />
                    </Typography>
                    <Controller
                        name="expirationDate"
                        control={control}
                        defaultValue={""}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...register("expirationDate")}
                                {...field}
                                type="text"
                                label="Fecha de expiración"
                                variant="outlined"
                                placeholder="mm/aa"
                                fullWidth
                                sx={{ mb: 2 }}
                                error={errors.expirationDate ? true : false}
                            />
                        )}
                    />
                    <Typography variant="caption" color="red">
                        <ErrorMessage errors={errors} name="cvc" />
                    </Typography>
                    <Controller
                        name="cvc"
                        control={control}
                        defaultValue={""}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...register("cvc")}
                                {...field}
                                type="password"
                                label="CVC"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                error={errors.cvc ? true : false}
                            />
                        )}
                    />
                    <Grid display={"flex"} justifyContent={"space-between"}>
                        <Button onClick={previusAction}>Atrás</Button>
                        <Button type="submit">Finalizar</Button>
                    </Grid>
                </div>
            </Grid>
        </form>
    </>)
}