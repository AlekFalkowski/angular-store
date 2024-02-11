import { Injectable } from "@angular/core";
import { TPaymentStableContent } from "../types/TPaymentStableContent";

@Injectable()
export class PaymentRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getPaymentStableContent(): Promise<TPaymentStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
