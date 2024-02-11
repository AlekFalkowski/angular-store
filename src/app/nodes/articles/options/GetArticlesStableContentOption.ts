import { inject, Injectable } from "@angular/core";
import { TArticlesStableContent } from "../types/TArticlesStableContent";
import { ArticlesRemoteStorage } from "../storages/ArticlesRemoteStorage";

@Injectable()
export class GetArticlesStableContentOption {
    private remoteStorage: ArticlesRemoteStorage = inject(ArticlesRemoteStorage)

    invoke(): Promise<TArticlesStableContent> {
        return this.remoteStorage.getArticlesStableContent()
    }
}
