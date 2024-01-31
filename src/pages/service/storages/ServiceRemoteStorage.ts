import { Injectable } from "@angular/core";
import { TServiceStableContent } from "../types/TServiceStableContent";

@Injectable()
export class ServiceRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getServiceStableContent(): Promise<TServiceStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
