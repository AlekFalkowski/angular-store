import { inject, Injectable } from "@angular/core";
import { KeyValueLocalStorage } from "@/shared/storages/KeyValueLocalStorage";
import { Keys } from "@/shared/storages/Keys";

@Injectable()
export class SetPreferredSidePanelViewOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)

    constructor() {
    }

    invoke(value: string): void {
        this.#_keyValueLocalStorage.setValueByKey({
            key: Keys.PREFERRED_SIDE_PANEL_VIEW,
            value: value
        })
    }
}