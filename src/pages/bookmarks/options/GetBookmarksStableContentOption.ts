import { inject, Injectable } from "@angular/core";
import { TBookmarksStableContent } from "../types/TBookmarksStableContent";
import { BookmarksRemoteStorage } from "../storages/BookmarksRemoteStorage";

@Injectable()
export class GetBookmarksStableContentOption {
    private remoteStorage: BookmarksRemoteStorage = inject(BookmarksRemoteStorage)

    invoke(): Promise<TBookmarksStableContent> {
        return this.remoteStorage.getBookmarksStableContent()
    }
}
