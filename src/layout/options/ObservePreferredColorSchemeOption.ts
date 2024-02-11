import { computed, inject, Injectable, Signal } from "@angular/core";
import { KeyValueLocalStorage } from "@/shared/storages/KeyValueLocalStorage";
import { Keys } from "@/shared/storages/Keys";
import { TKeyValue } from "@/shared/types/TKeyValue";

@Injectable()
export class ObservePreferredColorSchemeOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)
    #_bufferedValue: string | null

    constructor() {
        this.#_bufferedValue = this.#_keyValueLocalStorage.getValueByKey(Keys.PREFERRED_COLOR_SCHEME)
    }

    invoke: Signal<string | null> = computed(() => {
        const lastSetKeyValue: TKeyValue = this.#_keyValueLocalStorage.lastSetKeyValue()
        if (lastSetKeyValue.key == Keys.PREFERRED_COLOR_SCHEME) {
            this.#_bufferedValue = lastSetKeyValue.value
        }
        return this.#_bufferedValue
    })
}
