import { inject, Injectable, Signal } from "@angular/core";
import { LocalStorage } from "../resources/LocalStorage";

@Injectable()
export class ObserveQueryStringOption {
    #_localStorage: LocalStorage = inject(LocalStorage)

    invoke: Signal<string | null> = this.#_localStorage.observeQueryString
}
