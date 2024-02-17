import { inject, Injectable, NgZone, Signal, signal, WritableSignal } from "@angular/core";
import { GetStableContentOption } from "../options/GetStableContentOption";
import { TStableContent } from "../types/TStableContent";

@Injectable()
export class ViewModel {
    #_ngZone: NgZone = inject(NgZone)
    #_getStableContentOption: GetStableContentOption = inject(GetStableContentOption)

    /** Stable Content. */
    #_stableContentState: WritableSignal<"loading" | "success" | "error"> = signal("error")
    stableContentState: Signal<"loading" | "success" | "error"> = this.#_stableContentState.asReadonly()
    #_stableContent: WritableSignal<TStableContent | null> = signal(null)
    stableContent: Signal<TStableContent | null> = this.#_stableContent.asReadonly()

    /** Initialization Block. */
    constructor() {
        this.doStartInitialization()
    }

    doStartInitialization(): void {
        if (this.#_stableContentState() === "loading") {
            return
        }
        this.#_ngZone.run(() => {
            this.#_stableContentState.set("loading")
            this.#_getStableContentOption.invoke().subscribe({
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
}
