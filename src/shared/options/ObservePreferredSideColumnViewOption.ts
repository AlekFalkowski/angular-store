import { inject, Injectable, Signal } from "@angular/core";
import { LocalStorage } from "../resources/LocalStorage";

@Injectable({ providedIn: 'root' })
export class ObservePreferredSideColumnViewOption {
    #_localStorage: LocalStorage = inject(LocalStorage)

    invoke: Signal<string | null> = this.#_localStorage.observePreferredSideColumnView
}
