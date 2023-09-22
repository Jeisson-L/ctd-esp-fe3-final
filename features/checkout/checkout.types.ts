export type CheckoutInput = {
    customer: {
        name: string,
        lastname: string,
        email: string
        address: {
            address1: string,
            address2: string | null,
            city: string,
            state: string,
            zipCode: string
        }
    },
    card: {
        number: string,
        cvc: string,
        expDate: string,
        nameOnCard: string
    },
    order: {
        name: string;
        image: string;
        price: number;
    }
}

export type CheckoutDataForm = {
    name: string;
    lastName: string;
    email: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    cardNumber: string,
    cardName: string,
    expirationDate: string,
    cvc: string,
    orderName: string,
    orderImage: string,
    orederPrice: string,
}

export type PersonalData = {
    name: string;
    lastName: string;
    email: string;
}

export type ShippingData = {
    address: string;
    address2?: string
    city: string;
    state: string;
    zipCode: string;
}

export type PayData = {
    cardNumber: string,
    cardName: string,
    expirationDate: string,
    cvc: string,
}