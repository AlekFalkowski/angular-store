import { Injectable } from "@angular/core";
import { TContactsStableContent } from "../types/TContactsStableContent";

@Injectable()
export class ContactsRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getContactsStableContent(): Promise<TContactsStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
