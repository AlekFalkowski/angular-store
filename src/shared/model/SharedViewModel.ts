import { computed, inject, Injectable, Signal } from "@angular/core";
import { SetPreferredSidePanelViewOption } from "@/shared/options/SetPreferredSidePanelViewOption";
import { ObservePreferredSidePanelViewOption } from "@/shared/options/ObservePreferredSidePanelViewOption";
import { TPreferredSidePanelView } from "@/shared/types/TPreferredSidePanelView";

@Injectable({ providedIn: 'root' })
export class SharedViewModel {
    #_observePreferredSidePanelViewOption: ObservePreferredSidePanelViewOption = inject(ObservePreferredSidePanelViewOption)
    #_setPreferredSidePanelViewOption: SetPreferredSidePanelViewOption = inject(SetPreferredSidePanelViewOption)

    preferredSidePanelView: Signal<TPreferredSidePanelView> = computed(() => {
        const inputValue: string | null = this.#_observePreferredSidePanelViewOption.invoke()
        switch (inputValue) {
            case "hidden":
                return inputValue
            default:
                return "visible"
        }
    })

    setPreferredSidePanelView(value: TPreferredSidePanelView): void {
        this.#_setPreferredSidePanelViewOption.invoke(value)
    }
}
