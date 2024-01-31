import { Injectable } from "@angular/core";
import { TCartStableContent } from "../types/TCartStableContent";

@Injectable()
export class CartRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getCartStableContent(): Promise<TCartStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
