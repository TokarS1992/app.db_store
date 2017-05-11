import { validLengthField } from '../../../models/auth/auth.interface';

export interface IErrorsAuth {
    name: {
        required: string,
        minimum: string,
        maximum: string
    },
    email: {
        required: string,
        pattern: string
    },
    password: {
        required: string,
        minimum: string
    }
}

export let errorMessage: IErrorsAuth = {
    name: {
        required: "This field required",
        minimum: "Please enter minimum " + validLengthField.name[0] + " symbols",
        maximum: "Please delete last symbol.Maximum symbols: " + validLengthField.name[1]
    },
    email: {
        required: "This field required",
        pattern: "Please enter correct e-mail. Example: example@gmail.com"
    },
    password: {
        required: "This field required",
        minimum: "Please enter minimum " + validLengthField.password[0] + " symbols"
    }
}
