import { inject, Injectable, Signal } from "@angular/core";
import { Keys } from "@/shared/storages/Keys";
import { KeyValueLocalStorage } from "@/shared/storages/KeyValueLocalStorage";

@Injectable()
export class ObservePreferredColorSchemeOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)

    invoke: Signal<string | null> =
          this.#_keyValueLocalStorage.createObserveValueMethod(Keys.PREFERRED_COLOR_SCHEME)
}
