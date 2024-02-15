import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { THomeStableContent } from "../types/THomeStableContent";
import { API_BASE_URL } from "@/shared/storages/API_BASE_URL";

@Injectable()
export class HomeRemoteStorage {
    #_http: HttpClient = inject(HttpClient)

    getStableContent(): Observable<THomeStableContent> {
        return this.#_http.get<THomeStableContent>(
              `${ API_BASE_URL }/home/stable/`
        )
    }
}
