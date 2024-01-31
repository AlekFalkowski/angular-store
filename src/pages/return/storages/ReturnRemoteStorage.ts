import { Injectable } from "@angular/core";
import { TReturnStableContent } from "../types/TReturnStableContent";

@Injectable()
export class ReturnRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getReturnStableContent(): Promise<TReturnStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
