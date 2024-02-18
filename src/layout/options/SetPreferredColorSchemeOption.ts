import { inject, Injectable } from "@angular/core";
import { LocalStorage } from "../resources/LocalStorage";

@Injectable()
export class SetPreferredColorSchemeOption {
    #_localStorage: LocalStorage = inject(LocalStorage)

    invoke(value: string): void {
        this.#_localStorage.setPreferredColorScheme(value)
    }
}
