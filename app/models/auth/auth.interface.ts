export interface IAuth {
    name: string,
    email: string,
    // password: string
}

interface IValidLength {
    name: number[],
    password: number[]
}

export let validLengthField: IValidLength = {
    name: [2, 64],
    password: [6]
}