import { Injectable } from "@angular/core";
import { TNewsStableContent } from "../types/TNewsStableContent";

@Injectable()
export class NewsRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getNewsStableContent(): Promise<TNewsStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
