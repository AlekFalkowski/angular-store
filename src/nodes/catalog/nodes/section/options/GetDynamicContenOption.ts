import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RemoteStorage } from "../storages/RemoteStorage";
import { TDynamicContent } from "@/nodes/catalog/nodes/section/types/TDynamicContent";

@Injectable()
export class GetDynamicContentOption {
    #_remoteStorage: RemoteStorage = inject(RemoteStorage)

    invoke(
          catalogNavId: string,
          catalogSectionNavId: string,
          queryString: string
    ): Observable<TDynamicContent> {
        return this.#_remoteStorage.getDynamicContent(catalogNavId, catalogSectionNavId, queryString)
    }
}
