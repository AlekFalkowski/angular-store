import { Injectable } from "@angular/core";
import { TBookmarksStableContent } from "../types/TBookmarksStableContent";

@Injectable()
export class BookmarksRemoteStorage {
    private url: string = 'https://blanco.moscow/'

    async getBookmarksStableContent(): Promise<TBookmarksStableContent> {
        const data: Response = await fetch(this.url)
        return (await data.json()) ?? {}
    }
}
