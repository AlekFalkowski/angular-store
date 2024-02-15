import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HomeRemoteStorage } from "../storages/HomeRemoteStorage";
import { THomeStableContent } from "../types/THomeStableContent";

@Injectable()
export class GetHomeStableContentOption {
    #_remoteStorage: HomeRemoteStorage = inject(HomeRemoteStorage)

    invoke(): Observable<THomeStableContent> {
        return this.#_remoteStorage.getStableContent()
    }
}
