import { Injectable } from "@angular/core";
import { TOrderStableContent } from "../types/TOrderStableContent";

@Injectable()
export class OrderRemoteStorage {
    private url: string = 'https://blanco.moscow/purchase-orders/211921?contentType=json'

    async getOrderStableContent(): Promise<TOrderStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }

    // http.get<Config>('/api/config').subscribe(config => {
    // // process the configuration.
    // })
}
