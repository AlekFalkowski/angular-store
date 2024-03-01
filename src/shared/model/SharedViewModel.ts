import { computed, inject, Injectable, Signal } from "@angular/core";
import { SetPreferredSideColumnViewOption } from "@/shared/options/SetPreferredSideColumnViewOption";
import { ObservePreferredSideColumnViewOption } from "@/shared/options/ObservePreferredSideColumnViewOption";
import { TPreferredSideColumnView } from "@/shared/types/TPreferredSideColumnView";

@Injectable({ providedIn: 'root' })
export class SharedViewModel {
    #_observePreferredSideColumnViewOption: ObservePreferredSideColumnViewOption = inject(ObservePreferredSideColumnViewOption)
    #_setPreferredSideColumnViewOption: SetPreferredSideColumnViewOption = inject(SetPreferredSideColumnViewOption)

    preferredSideColumnView: Signal<TPreferredSideColumnView> = computed(() => {
        const inputValue: string | null = this.#_observePreferredSideColumnViewOption.invoke()
        switch (inputValue) {
            case "hidden":
                return inputValue
            default:
                return "visible"
        }
    })

    setPreferredSideColumnView(value: TPreferredSideColumnView): void {
        this.#_setPreferredSideColumnViewOption.invoke(value)
    }
}
