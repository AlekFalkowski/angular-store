import { TOrderItem } from "./TOrderItem";

export type TOrderStableContent = {
    htmlHeadTitle: string
    pageTitle: string
    number: string
    items: TOrderItem[]
    amount: string
}
