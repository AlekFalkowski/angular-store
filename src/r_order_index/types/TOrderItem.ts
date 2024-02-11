import { TOrderItemProduct } from "./TOrderItemProduct";
import { TOrderItemPrice } from "./TOrderItemPrice";
import { TOrderItemAmount } from "./TOrderItemAmount";
import { TOrderItemQty } from "./TOrderItemQty";

export type TOrderItem = {
    number: string
    product: TOrderItemProduct
    price: TOrderItemPrice
    qty: TOrderItemQty
    amount: TOrderItemAmount
}
