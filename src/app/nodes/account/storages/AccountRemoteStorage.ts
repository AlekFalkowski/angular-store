import { Injectable } from "@angular/core";
import { TAccountStableContent } from "../types/TAccountStableContent";

@Injectable()
export class AccountRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getAccountStableContent(): Promise<TAccountStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
