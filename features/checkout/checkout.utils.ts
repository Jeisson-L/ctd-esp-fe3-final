import { Comic } from "interface/comic"
import { CheckoutDataForm, CheckoutInput } from "./checkout.types"

export const normalizeCheoutInfoToSend = (dataForm: CheckoutDataForm, data: object, comic: Comic | undefined) => {
    const complitedData = { ...dataForm, ...data };
    complitedData.orderName = comic ? comic.title : "";
    complitedData.orderImage = comic ? comic.thumbnail.path + comic.thumbnail.extension : "";
    complitedData.orederPrice = comic ? comic.price.toString() : "";
    return complitedData;
}

export const createCheckoutInput = (dataForm: CheckoutDataForm) => {
    var res: CheckoutInput = {
        customer: {
            name: dataForm.name,
            lastname: dataForm.lastName,
            email: dataForm.email,
            address: {
                address1: dataForm.address,
                address2: dataForm.address2 ?? null,
                city: dataForm.city,
                state: dataForm.state,
                zipCode: dataForm.zipCode
            }
        },
        card: {
            number: dataForm.cardNumber,
            cvc: dataForm.cvc,
            expDate: dataForm.expirationDate,
            nameOnCard: dataForm.cardName
        },
        order: {
            name: dataForm.orderName,
            image: dataForm.orderImage,
            price: Number(dataForm.orederPrice)
        }
    }

    return res
}

export const defaultCheckoutDataForm = (comic?: Comic) => {
    const defaultData: CheckoutDataForm =
    {
        name: "",
        lastName: "",
        email: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        cardNumber: "",
        cardName: "",
        expirationDate: "",
        cvc: "",
        orderName: comic ? comic.title : "",
        orderImage: comic ? comic.thumbnail.path + comic.thumbnail.extension : "",
        orederPrice: comic ? comic.price.toString() : ""
    }

    return defaultData
}

export const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}