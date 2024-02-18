import { Injectable } from "@angular/core";
import { TArticlesStableContent } from "../types/TArticlesStableContent";

@Injectable()
export class ArticlesRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getArticlesStableContent(): Promise<TArticlesStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
