import { inject, Injectable, Signal } from "@angular/core";
import { Keys } from "@/shared/storages/Keys";
import { KeyValueLocalStorage } from "@/shared/storages/KeyValueLocalStorage";

// @Injectable({ providedIn: 'root' })
// export class ObservePreferredSidePanelViewOption extends ObserveValueByKeyOption {
//     constructor() {
//         super(Keys.PREFERRED_SIDE_PANEL_VIEW)
//     }
// }

@Injectable({ providedIn: 'root' })
export class ObservePreferredSidePanelViewOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)

    invoke: Signal<string | null> =
          this.#_keyValueLocalStorage.observeValueByKeyOption(Keys.PREFERRED_SIDE_PANEL_VIEW)
}
