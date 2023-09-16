import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaShippingData } from '../../rules/index';
import { ErrorMessage } from '@hookform/error-message';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import { Grid } from "@mui/material";

interface ShippingData {
    address: string;
    department?: string
    city: string;
    state: string;
    postalCode: string;
}

export const ShippingDataForm: FC<any> = ({ saveDataOnSubmit, nextAction, previusAction, defaultValues }) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<ShippingData>({ resolver: yupResolver(schemaShippingData), defaultValues });

    const onSubmit = (data: any) => {
        saveDataOnSubmit(data);
        nextAction();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="address" />
            </Typography>
            <Controller
                name="address"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="Dirección"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={errors.address ? true : false}
                    />
                )}
            />

            <Controller
                name="department"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="Departamento, piso, etc (Opcional)"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={errors.department ? true : false}
                    />
                )}
            />

            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="city" />
            </Typography>
            <Controller
                name="city"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="Ciudad"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={errors.city ? true : false}
                    />
                )}
            />

            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="state" />
            </Typography>
            <Controller
                name="state"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="Provincia"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={errors.state ? true : false}
                    />
                )}
            />

            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="postalCode" />
            </Typography>
            <Controller
                name="postalCode"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="Código Postal"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={errors.postalCode ? true : false}
                    />
                )}
            />
            <Grid display={"flex"} justifyContent={"space-between"}>
                <Button onClick={previusAction}>Atrás</Button>
                <Button type="submit">Siguiente</Button>
            </Grid>
        </form>
    )
}