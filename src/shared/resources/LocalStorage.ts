import { inject, Injectable, Signal } from "@angular/core";
import { LocalStorageService } from "@/shared/services/LocalStorageService";
import { Keys } from "@/shared/resources/Keys";

@Injectable({ providedIn: 'root' })
export class LocalStorage {
    #_localStorageService: LocalStorageService = inject(LocalStorageService)

    observePreferredSidePanelView: Signal<string | null> =
          this.#_localStorageService.createObserveValueMethod(Keys.PREFERRED_SIDE_PANEL_VIEW)

    setPreferredSidePanelView: (value: string) => void =
          this.#_localStorageService.createSetValueMethod(Keys.PREFERRED_SIDE_PANEL_VIEW)
}
