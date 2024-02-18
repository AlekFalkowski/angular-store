import { TFieldSet } from "@/shared/types/TFieldSet";

export type TStableContent = {
    htmlHeadTitle: string
    pageTitle: string
    breadcrumbs: string
    filterConfig?: TFieldSet[]
}
