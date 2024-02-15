import { inject, Injectable } from "@angular/core";
import { Keys } from "@/shared/storages/Keys";
import { SetValueByKeyOption } from "@/shared/options/SetValueByKeyOption";
import { KeyValueLocalStorage } from "@/shared/storages/KeyValueLocalStorage";

// @Injectable({ providedIn: 'root' })
// export class SetPreferredSidePanelViewOption extends SetValueByKeyOption {
//     constructor() {
//         super(Keys.PREFERRED_SIDE_PANEL_VIEW)
//     }
// }

@Injectable({ providedIn: 'root' })
export class SetPreferredSidePanelViewOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)

    invoke: (value: string) => void =
          this.#_keyValueLocalStorage.setValueByKeyOption(Keys.PREFERRED_SIDE_PANEL_VIEW)
}
