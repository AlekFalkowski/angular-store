import { TFieldOption } from "./TFieldOption";

export type TFieldCollection = (TMultiChoiceField | TSingleChoiceField | TRangeField | TTextField)[]

type TMultiChoiceField = {
    type: "TMultiChoiceField"
    label: string
    name: string
    options: TFieldOption[]
    //
    placeholder?: string
    helpText?: string
    quickInfo?: string
}

type TSingleChoiceField = {
    type: "TSingleChoiceField"
    label: string
    name: string
    defaultOptionValue?: string
    options: TFieldOption[]
    //
    placeholder?: string
    helpText?: string
    quickInfo?: string
}

type TRangeField = {
    type: "TRangeField"
    label: string
    name: string
    endName: string // Name for the second field in the range.
    value?: string // ?The initial value of the field.
    //
    valueType?: string
    units?: string
    minVal?: number
    maxVal?: number
    numberOfDigitsAfterDot?: number
    //
    placeholder?: string
    endPlaceholder?: string // Placeholder for the second field in the range.
    helpText?: string
    endHelpText?: string // HelpText for the second field in the range.
    quickInfo?: string
}

type TTextField = {
    type: "TTextField"
    label: string
    name: string
    value?: string // ?The initial value of the field.
    //
    valueType?: string
    units?: string
    minVal?: number
    maxVal?: number
    numberOfDigitsAfterDot?: number
    //
    placeholder?: string
    helpText?: string
    quickInfo?: string
}
