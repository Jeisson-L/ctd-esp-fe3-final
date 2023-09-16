import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaPersonalData } from '../../rules/index';
import { ErrorMessage } from '@hookform/error-message';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import { Grid } from "@mui/material";

interface PersonalData {
    name: string;
    lastName: string;
    email: string;
}

export const PersonalDataForm: FC<any> = ({ saveDataOnSubmit, nextAction, defaultValues }) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<PersonalData>({ resolver: yupResolver(schemaPersonalData), defaultValues });

    const onSubmit = (data: any) => {
        saveDataOnSubmit(data);
        nextAction();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="name" />
            </Typography>
            <Controller
                name="name"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={errors.name ? true : false}
                    />
                )}
            />

            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="lastName" />
            </Typography>
            <Controller
                name="lastName"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="text"
                        label="Apellido"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={errors.lastName ? true : false}
                    />
                )}
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="email" />
            </Typography>
            <Controller
                name="email"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="email"
                        label="Correo"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        error={errors.email ? true : false}
                    />
                )}
            />
            <Grid display={"flex"} justifyContent={"space-between"}>
                <Button></Button>
                <Button type="submit">Siguiente</Button>
            </Grid>
        </form>
    )
}