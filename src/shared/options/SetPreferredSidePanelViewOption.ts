import { inject, Injectable } from "@angular/core";
import { Keys } from "../storages/Keys";
import { KeyValueLocalStorage } from "../storages/KeyValueLocalStorage";

@Injectable({ providedIn: 'root' })
export class SetPreferredSidePanelViewOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)

    invoke: (value: string) => void =
          this.#_keyValueLocalStorage.createSetValueMethod(Keys.PREFERRED_SIDE_PANEL_VIEW)
}
