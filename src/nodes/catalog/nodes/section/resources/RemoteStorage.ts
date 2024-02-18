import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TDynamicContent } from "../types/TDynamicContent";
import { TStableContent } from "../types/TStableContent";
import { API_BASE_URL } from "@/shared/resources/API_BASE_URL";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class RemoteStorage {
    #_http: HttpClient = inject(HttpClient)
    #_route: ActivatedRoute = inject(ActivatedRoute)
    #_catalogNavId = this.#_route.snapshot.params['catalogNavId']
    #_catalogSectionNavId = this.#_route.snapshot.params['catalogSectionNavId'] ?? '0'

    getDynamicContent(queryString: string): Observable<TDynamicContent> {
        return this.#_http.get<TDynamicContent>(
            `${ API_BASE_URL }/catalogs/${ this.#_catalogNavId }/sections/${ this.#_catalogSectionNavId }/dynamic/${ queryString }`
        )
    }

    getStableContent(queryString: string): Observable<TStableContent> {
        return this.#_http.get<TStableContent>(
            `${ API_BASE_URL }/catalogs/${ this.#_catalogNavId }/sections/${ this.#_catalogSectionNavId }/stable/${ queryString }`
        )
    }
}
