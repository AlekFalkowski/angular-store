import { computed, inject, Injectable, Signal } from "@angular/core";
import { KeyValueLocalStorage } from "@/shared/storages/KeyValueLocalStorage";
import { Keys } from "@/shared/storages/Keys";
import { TKeyValue } from "@/shared/types/TKeyValue";

@Injectable()
export class ObservePreferredSidePanelViewOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)
    #_bufferedValue: string | null

    constructor() {
        this.#_bufferedValue = this.#_keyValueLocalStorage.getValueByKey(Keys.PREFERRED_SIDE_PANEL_VIEW)
    }

    invoke: Signal<string | null> = computed(() => {
        const lastSetKeyValue: TKeyValue = this.#_keyValueLocalStorage.lastSetKeyValue()
        if (lastSetKeyValue.key == Keys.PREFERRED_SIDE_PANEL_VIEW) {
            this.#_bufferedValue = lastSetKeyValue.value
        }
        return this.#_bufferedValue
    })
}
