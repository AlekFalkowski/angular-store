import { computed, inject, Injectable, NgZone, signal, Signal, WritableSignal } from "@angular/core";
import { GetStableContentOption } from "../options/GetStableContentOption";
import { ObservePreferredColorSchemeOption } from "../options/ObservePreferredColorSchemeOption";
import { SetPreferredColorSchemeOption } from "../options/SetPreferredColorSchemeOption";
import { TStableContent } from "../types/TStableContent";

@Injectable()
export class ViewModel {
    #_ngZone: NgZone = inject(NgZone)
    #_getStableContentOption: GetStableContentOption = inject(GetStableContentOption)
    #_observePreferredColorSchemeOption: ObservePreferredColorSchemeOption = inject(ObservePreferredColorSchemeOption)
    #_setPreferredColorSchemeOption: SetPreferredColorSchemeOption = inject(SetPreferredColorSchemeOption)

    constructor() {
        this.doStartInitialization()
    }

    doStartInitialization(): void {
        if (this.#_stableContentState() === "loading") {
            return
        }
        this.#_ngZone.run(() => {
            // this.#_stableContentState.set("success")
            this.#_stableContentState.set("loading")
            this.#_getStableContentOption.invoke("").subscribe({
                next: (stableContent) => {
                    this.#_stableContent.set(stableContent)
                    this.#_stableContentState.set("success")
                },
                error: (err) => {
                    this.#_stableContentState.set("error")
                }
            })
        })
    }

    #_stableContentState: WritableSignal<"loading" | "success" | "error"> = signal("error")
    stableContentState: Signal<"loading" | "success" | "error"> = this.#_stableContentState.asReadonly()
    #_stableContent: WritableSignal<TStableContent | null> = signal(null)
    stableContent: Signal<TStableContent | null> = this.#_stableContent.asReadonly()

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
