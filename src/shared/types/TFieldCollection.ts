import { TOption } from "./TOption";

// export type TField = {
//     type: "multiChoice" | "singleChoice" | "range" | "text", // email, password, tel, number
//     label: string,
//     name: string,
//     endName?: string, // Name for the second field in the range.
//     value?: string, // Either value or options.
//     options?: TOption[],
//     //
//     valueType?: string,
//     units?: string,
//     minVal?: number,
//     maxVal?: number,
//     numberOfDigitsAfterDot?: number,
//     //
//     placeholder?: string,
//     endPlaceholder?: string,
//     helpText?: string,
//     endHelpText?: string,
//     quickInfo?: string,
// }

export type TFieldCollection = (TMultiChoiceField | TSingleChoiceField | TRangeField | TTextField)[]

type TMultiChoiceField = {
    type: "TMultiChoiceField"
    label: string,
    name: string,
    options: TOption[],
    //
    placeholder?: string,
    helpText?: string,
    quickInfo?: string,
}

type TSingleChoiceField = {
    type: "TSingleChoiceField"
    label: string,
    name: string,
    options: TOption[],
    //
    placeholder?: string,
    helpText?: string,
    quickInfo?: string,
}

type TRangeField = {
    type: "TRangeField"
    label: string,
    name: string,
    endName?: string, // Name for the second field in the range.
    value?: string, // ?The initial value of the field.
    //
    valueType?: string,
    units?: string,
    minVal?: number,
    maxVal?: number,
    numberOfDigitsAfterDot?: number,
    //
    placeholder?: string,
    endPlaceholder?: string, // Placeholder for the second field in the range.
    helpText?: string,
    endHelpText?: string, // HelpText for the second field in the range.
    quickInfo?: string,
}

type TTextField = {
    type: "TTextField",
    label: string,
    name: string,
    value?: string, // ?The initial value of the field.
    //
    valueType?: string,
    units?: string,
    minVal?: number,
    maxVal?: number,
    numberOfDigitsAfterDot?: number,
    //
    placeholder?: string,
    helpText?: string,
    quickInfo?: string,
}
