import { Injectable } from "@angular/core";
import { TCompanyStableContent } from "../types/TCompanyStableContent";

@Injectable()
export class CompanyRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getCompanyStableContent(): Promise<TCompanyStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
