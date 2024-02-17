import { inject, Injectable, Signal } from "@angular/core";
import { Keys } from "../storages/Keys";
import { KeyValueLocalStorage } from "../storages/KeyValueLocalStorage";

@Injectable({ providedIn: 'root' })
export class ObservePreferredSidePanelViewOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)

    invoke: Signal<string | null> =
          this.#_keyValueLocalStorage.createObserveValueMethod(Keys.PREFERRED_SIDE_PANEL_VIEW)
}

// Another variant:
// @Injectable({ providedIn: 'root' })
// export class ObservePreferredSidePanelViewOption extends ObserveLocalValueOption {
//     constructor() {
//         super(Keys.PREFERRED_SIDE_PANEL_VIEW)
//     }
// }

// Another variant:
// @Injectable({ providedIn: 'root' })
// export class ObservePreferredSidePanelViewOption {
//     constructor() {
//         // const observeLocalValueOption = new ObserveLocalValueOption(Keys.PREFERRED_SIDE_PANEL_VIEW)
//         // this.invoke = observeLocalValueOption.invoke
//         this.invoke = new ObserveLocalValueOption(Keys.PREFERRED_SIDE_PANEL_VIEW).invoke
//     }
//     invoke: Signal<string | null>
// }
