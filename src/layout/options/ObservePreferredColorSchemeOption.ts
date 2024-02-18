import { inject, Injectable, Signal } from "@angular/core";
import { LocalStorage } from "../resources/LocalStorage";

@Injectable()
export class ObservePreferredColorSchemeOption {
    #_localStorage: LocalStorage = inject(LocalStorage)

    invoke: Signal<string | null> = this.#_localStorage.observePreferredColorScheme
}
