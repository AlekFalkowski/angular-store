import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RemoteStorage } from "../storages/RemoteStorage";
import { TStableContent } from "../types/TStableContent";

@Injectable()
export class GetStableContentOption {
    #_remoteStorage: RemoteStorage = inject(RemoteStorage)

    invoke(
          catalogNavId: string,
          catalogSectionNavId: string,
          queryString: string
    ): Observable<TStableContent> {
        return this.#_remoteStorage.getStableContent(catalogNavId, catalogSectionNavId, queryString)
    }
}
