import { computed, inject, Injectable, Signal } from "@angular/core";
import { SetPreferredSidePanelViewOption } from "@/shared/options/SetPreferredSidePanelViewOption";
import { ObservePreferredSidePanelViewOption } from "@/shared/options/ObservePreferredSidePanelViewOption";
import { TPreferredSidePanelView } from "@/shared/types/TPreferredSidePanelView";

@Injectable({ providedIn: 'root' })
export class SharedViewModel {
    private observePreferredSidePanelViewOption: ObservePreferredSidePanelViewOption = inject(ObservePreferredSidePanelViewOption)
    private setPreferredSidePanelViewOption: SetPreferredSidePanelViewOption = inject(SetPreferredSidePanelViewOption)

    constructor() {
    }

    preferredSidePanelView: Signal<TPreferredSidePanelView> = computed(() => {
        const inputValue: string | null = this.observePreferredSidePanelViewOption.invoke()
        switch (inputValue) {
            case "hidden":
                return inputValue
            default:
                return "visible"
        }
    })

    setPreferredSidePanelView(value: TPreferredSidePanelView): void {
        this.setPreferredSidePanelViewOption.invoke(value)
    }
}
