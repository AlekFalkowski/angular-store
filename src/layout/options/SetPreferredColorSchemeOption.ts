import { inject, Injectable } from "@angular/core";
import { Keys } from "@/shared/storages/Keys";
import { KeyValueLocalStorage } from "@/shared/storages/KeyValueLocalStorage";

@Injectable()
export class SetPreferredColorSchemeOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)

    invoke: (value: string) => void =
          this.#_keyValueLocalStorage.createSetValueMethod(Keys.PREFERRED_COLOR_SCHEME)
}
