import { inject, Injectable, Signal } from "@angular/core";
import { LocalStorageService } from "@/shared/services/LocalStorageService";
import { Keys } from "@/shared/resources/Keys";

@Injectable()
export class LocalStorage {
    #_localStorageService: LocalStorageService = inject(LocalStorageService)

    observePreferredColorScheme: Signal<string | null> =
          this.#_localStorageService.createObserveValueMethod(Keys.PREFERRED_COLOR_SCHEME)

    setPreferredColorScheme: (value: string) => void =
          this.#_localStorageService.createSetValueMethod(Keys.PREFERRED_COLOR_SCHEME)
}
