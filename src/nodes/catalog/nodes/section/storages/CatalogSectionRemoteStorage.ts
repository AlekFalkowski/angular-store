import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TCatalogSectionStableContent } from "../types/TCatalogSectionStableContent";
import { API_BASE_URL } from "@/shared/storages/API_BASE_URL";

@Injectable()
export class CatalogSectionRemoteStorage {
    #_http: HttpClient = inject(HttpClient)

    getStableContent(
          catalogNavId: string,
          catalogSectionNavId: string,
          queryString: string
    ): Observable<TCatalogSectionStableContent> {
        return this.#_http.get<TCatalogSectionStableContent>(
              `${ API_BASE_URL }/catalogs/${catalogNavId}/sections/${catalogSectionNavId}/stable/${queryString}`
        )
    }
}
