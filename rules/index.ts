import * as yup from "yup";

export const schemaPersonalData = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    lastName: yup.string().required('El apellido es obligatorio'),
    email: yup.string().email('El email no es válido').required('El email es obligatorio'),
});

export const schemaShippingData = yup.object({
    address: yup.string().required('La dirección es obligatoria'),
    address2: yup.string(),
    city: yup.string().required('La ciudad es obligatoria'),
    state: yup.string().required('La provincia es obligatoria'),
    zipCode: yup.string().required('El código postal es obligatorio'),
});

export const schemaPayData = yup.object({
    cardNumber: yup.string().required('El número de tarjeta es obligatorio').matches(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos'),
    cardName: yup.string().required('El nombre en la tarjeta es obligatorio'),
    expirationDate: yup.string().required('La fecha de expiración es obligatoria').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato de fecha de vencimiento no válido'),
    cvc: yup.string().required('El código de seguridad es obligatorio').matches(/^\d{3}$/, 'El código CVV debe tener 3 dígitos'),
});