import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RemoteStorage } from "../resources/RemoteStorage";
import { TDynamicContent } from "../types/TDynamicContent";

@Injectable()
export class GetDynamicContentOption {
    #_remoteStorage: RemoteStorage = inject(RemoteStorage)

    invoke(queryString: string): Observable<TDynamicContent> {
        return this.#_remoteStorage.getDynamicContent(queryString)
    }
}
