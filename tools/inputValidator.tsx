import { inputValue } from "../type/index.d"

const isValidInput = (str: string): string[] => {
    const jsonObj: inputValue[] = eval(str)
    let errorArray = []
    if (jsonObj.length > 50) {
        errorArray.push("Input value should have less than or equal to 50 items")
    }
    if (jsonObj.some((item) => typeof item?.name !== 'string')) {
        errorArray.push("Input name should be a string")
    }
    if (jsonObj.some((item) => item?.name?.length > 50)) {
        errorArray.push("Input name in less than 50 characters")
    }
    if (jsonObj.some((item) => item?.weight <= 0)) {
        errorArray.push("Input weight should be a interger number")

    }
    return errorArray
}

export default isValidInput