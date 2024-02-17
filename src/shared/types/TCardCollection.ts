export type TCardCollection = (TAssortmentCard | TCatalogProductCard)[]

type TAssortmentCard = {
    type: "TAssortmentCard"
    imageUrl: string
    title: string
    outLink: string
    description: string
}
type TCatalogProductCard = {
    type: "TCatalogProductCard"
    imageUrl: string
    title: string
    outLink: string
    price: string
}
