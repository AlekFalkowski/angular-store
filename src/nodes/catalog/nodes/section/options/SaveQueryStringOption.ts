import { inject, Injectable } from "@angular/core";
import { LocalStorage } from "../resources/LocalStorage";

@Injectable()
export class SaveQueryStringOption {
    #_localStorage: LocalStorage = inject(LocalStorage)

    invoke(value: string): void {
        this.#_localStorage.saveQueryString(value)
    }
}
