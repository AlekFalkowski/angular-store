import { inject, Injectable, Signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "@/shared/services/LocalStorageService";
import { Keys } from "@/shared/resources/Keys";

@Injectable()
export class LocalStorage {
    #_localStorageService: LocalStorageService = inject(LocalStorageService)
    #_route: ActivatedRoute = inject(ActivatedRoute)
    #_catalogNavId = this.#_route.snapshot.params['catalogNavId']
    #_catalogSectionNavId = this.#_route.snapshot.params['catalogSectionNavId'] ?? '0'

    observeQueryString: Signal<string | null> =
        this.#_localStorageService.createObserveValueMethod(
            `${ Keys.CATALOG_SECTION_QUERY_STRING_PREF }_${ this.#_catalogNavId }_${ this.#_catalogSectionNavId }`
        )

    saveQueryString: (value: string) => void =
        this.#_localStorageService.createSetValueMethod(
            `${ Keys.CATALOG_SECTION_QUERY_STRING_PREF }_${ this.#_catalogNavId }_${ this.#_catalogSectionNavId }`
        )
}
