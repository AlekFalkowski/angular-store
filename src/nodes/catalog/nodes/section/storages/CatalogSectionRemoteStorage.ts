import { Injectable } from "@angular/core";
import { TCatalogSectionStableContent } from "../types/TCatalogSectionStableContent";

@Injectable()
export class CatalogSectionRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getStableContent(): Promise<TCatalogSectionStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
