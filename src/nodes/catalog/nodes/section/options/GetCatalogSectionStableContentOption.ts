import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CatalogSectionRemoteStorage } from "../storages/CatalogSectionRemoteStorage";
import { TCatalogSectionStableContent } from "../types/TCatalogSectionStableContent";

@Injectable()
export class GetCatalogSectionStableContentOption {
    #_remoteStorage: CatalogSectionRemoteStorage = inject(CatalogSectionRemoteStorage)

    invoke(
          catalogNavId: string,
          catalogSectionNavId: string,
          queryString: string
    ): Observable<TCatalogSectionStableContent> {
        return this.#_remoteStorage.getStableContent(catalogNavId, catalogSectionNavId, queryString)
    }
}
