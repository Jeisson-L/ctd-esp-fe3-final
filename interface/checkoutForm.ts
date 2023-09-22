import { CheckoutDataForm } from "dh-marvel/features/checkout/checkout.types";

export interface CheckoutForm {
    saveDataOnSubmit: Function,
    nextAction?: Function,
    previusAction?: Function,
    defaultValues: CheckoutDataForm
}