import { computed, inject, Injectable, Signal } from "@angular/core";
import { KeyValueLocalStorage } from "../../shared/storages/KeyValueLocalStorage";
import { Keys } from "../../shared/storages/Keys";
import { TKeyValueItem } from "../../shared/types/TKeyValueItem";

@Injectable()
export class ObservePreferredColorSchemeOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)
    #_bufferedValue: string | null

    constructor() {
        this.#_bufferedValue = this.#_keyValueLocalStorage.getValueByKey(Keys.PREFERRED_COLOR_SCHEME)
    }

    invoke: Signal<string | null> = computed(() => {
        const lastSetKeyValueItem: TKeyValueItem = this.#_keyValueLocalStorage.lastSetKeyValueItem()
        if (lastSetKeyValueItem.key == Keys.PREFERRED_COLOR_SCHEME) {
            this.#_bufferedValue = lastSetKeyValueItem.value
        }
        return this.#_bufferedValue
    })
}
