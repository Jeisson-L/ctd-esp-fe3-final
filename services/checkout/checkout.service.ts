import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

export const fetchCheckoutComicApi = async (comicId: Number) => {
    const url = `/api/comics/${comicId}`
    const response = await fetch(url);
    return await response.json();
}

export const fetchCheckoutApi = async (data: CheckoutInput) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const url = `/api/checkout`
    const response = await fetch(url, options);
    return await response.json();
}