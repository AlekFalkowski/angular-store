import { Injectable } from "@angular/core";
import { TDeliveryStableContent } from "../types/TDeliveryStableContent";

@Injectable()
export class DeliveryRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getDeliveryStableContent(): Promise<TDeliveryStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
