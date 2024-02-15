import { inject, Injectable } from "@angular/core";
import { Keys } from "@/shared/storages/Keys";
import { SetValueByKeyOption } from "@/shared/options/SetValueByKeyOption";
import { KeyValueLocalStorage } from "@/shared/storages/KeyValueLocalStorage";

// @Injectable()
// export class SetPreferredColorSchemeOption extends SetValueByKeyOption {
//     constructor() {
//         super(Keys.PREFERRED_COLOR_SCHEME)
//     }
// }

@Injectable()
export class SetPreferredColorSchemeOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)

    invoke: (value: string) => void =
          this.#_keyValueLocalStorage.setValueByKeyOption(Keys.PREFERRED_COLOR_SCHEME)
}
