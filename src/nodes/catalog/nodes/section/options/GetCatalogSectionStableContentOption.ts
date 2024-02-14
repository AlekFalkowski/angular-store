import { inject, Injectable } from "@angular/core";
import { TCatalogSectionStableContent } from "../types/TCatalogSectionStableContent";
import { CatalogSectionRemoteStorage } from "../storages/CatalogSectionRemoteStorage";

@Injectable()
export class GetCatalogSectionStableContentOption {
    #_remoteStorage: CatalogSectionRemoteStorage = inject(CatalogSectionRemoteStorage)

    invoke(): Promise<TCatalogSectionStableContent> {
        return this.#_remoteStorage.getStableContent()
    }

}
