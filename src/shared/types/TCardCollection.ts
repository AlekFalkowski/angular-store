export type TCardCollection = {
    T: string // "TAssortmentCard" | "TCatalogProductCard"
    imageUrl: string
    title: string
    outLink: string
    description?: string
    price?: string
    // [key: string]: string
}[]
