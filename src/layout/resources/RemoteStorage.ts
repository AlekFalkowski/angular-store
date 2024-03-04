import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TStableContent } from "../types/TStableContent";
import { API_BASE_URL } from "@/shared/resources/API_BASE_URL";

@Injectable()
export class RemoteStorage {
    #_http: HttpClient = inject(HttpClient)

    getStableContent(queryString: string): Observable<TStableContent> {
        return this.#_http.get<TStableContent>(
            `${ API_BASE_URL }/stable/${ queryString }`
        )
    }
}
