import { computed, inject, Injectable, Signal } from "@angular/core";
import { ObservePreferredColorSchemeOption } from "../options/ObservePreferredColorSchemeOption";
import { SetPreferredColorSchemeOption } from "../options/SetPreferredColorSchemeOption";

@Injectable()
export class ViewModel {
    #_observePreferredColorSchemeOption: ObservePreferredColorSchemeOption = inject(ObservePreferredColorSchemeOption)
    #_setPreferredColorSchemeOption: SetPreferredColorSchemeOption = inject(SetPreferredColorSchemeOption)

    preferredColorScheme: Signal<"auto" | "light" | "dark"> = computed(() => {
        const inputValue: string | null = this.#_observePreferredColorSchemeOption.invoke()
        switch (inputValue) {
            case "light":
            case "dark":
                return inputValue
            default:
                return "auto"
        }
    })

    setPreferredColorScheme(value: "auto" | "light" | "dark"): void {
        this.#_setPreferredColorSchemeOption.invoke(value)
    }
}
