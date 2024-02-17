import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TDynamicContent } from "../types/TDynamicContent";
import { TStableContent } from "../types/TStableContent";
import { API_BASE_URL } from "@/shared/storages/API_BASE_URL";

@Injectable()
export class RemoteStorage {
    #_http: HttpClient = inject(HttpClient)

    getDynamicContent(
          catalogNavId: string,
          catalogSectionNavId: string,
          queryString: string
    ): Observable<TDynamicContent> {
        return this.#_http.get<TDynamicContent>(
              `${ API_BASE_URL }/catalogs/${catalogNavId}/sections/${catalogSectionNavId}/dynamic/${queryString}`
        )
    }

    getStableContent(
          catalogNavId: string,
          catalogSectionNavId: string,
          queryString: string
    ): Observable<TStableContent> {
        return this.#_http.get<TStableContent>(
              `${ API_BASE_URL }/catalogs/${catalogNavId}/sections/${catalogSectionNavId}/stable/${queryString}`
        )
    }

}
