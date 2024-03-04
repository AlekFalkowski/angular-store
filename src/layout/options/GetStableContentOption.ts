import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RemoteStorage } from "../resources/RemoteStorage";
import { TStableContent } from "../types/TStableContent";

@Injectable()
export class GetStableContentOption {
    #_remoteStorage: RemoteStorage = inject(RemoteStorage)

    invoke(queryString: string): Observable<TStableContent> {
        return this.#_remoteStorage.getStableContent(queryString)
    }
}
