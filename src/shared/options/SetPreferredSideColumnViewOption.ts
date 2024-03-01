import { inject, Injectable } from "@angular/core";
import { LocalStorage } from "../resources/LocalStorage";

@Injectable({ providedIn: 'root' })
export class SetPreferredSideColumnViewOption {
    #_localStorage: LocalStorage = inject(LocalStorage)

    invoke(value: string): void {
        this.#_localStorage.setPreferredSideColumnView(value)
    }
}
