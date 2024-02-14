import { computed, inject, Injectable, Signal } from "@angular/core";
import { ObservePreferredColorSchemeOption } from "../options/ObservePreferredColorSchemeOption";
import { SetPreferredColorSchemeOption } from "../options/SetPreferredColorSchemeOption";

@Injectable()
export class LayoutViewModel {
    private observePreferredColorSchemeOption: ObservePreferredColorSchemeOption = inject(ObservePreferredColorSchemeOption)
    private setPreferredColorSchemeOption: SetPreferredColorSchemeOption = inject(SetPreferredColorSchemeOption)

    constructor() {
    }

    colorScheme: Signal<"auto" | "light" | "dark"> = computed(() => {
        const inputValue: string | null = this.observePreferredColorSchemeOption.invoke()
        switch (inputValue) {
            case "light":
            case "dark":
                return inputValue
            default:
                return "auto"
        }
    })

    setColorScheme(value: "auto" | "light" | "dark"): void {
        this.setPreferredColorSchemeOption.invoke(value)
    }
}
