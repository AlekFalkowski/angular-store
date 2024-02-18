import { inject, Injectable } from "@angular/core";
import { TNewsStableContent } from "../types/TNewsStableContent";
import { NewsRemoteStorage } from "../resources/NewsRemoteStorage";

@Injectable()
export class GetNewsStableContentOption {
    private remoteStorage: NewsRemoteStorage = inject(NewsRemoteStorage)

    invoke(): Promise<TNewsStableContent> {
        return this.remoteStorage.getNewsStableContent()
    }
}
