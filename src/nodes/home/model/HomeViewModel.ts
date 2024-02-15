import { inject, Injectable, NgZone, Signal, signal, WritableSignal } from "@angular/core";
import { GetHomeStableContentOption } from "../options/GetHomeStableContent";
import { THomeStableContent } from "../types/THomeStableContent";

@Injectable()
export class HomeViewModel {
    #_ngZone: NgZone = inject(NgZone)
    #_getStableContentOption: GetHomeStableContentOption = inject(GetHomeStableContentOption)

    /** Stable Content. */
    #_stableContentState: WritableSignal<"loading" | "success" | "error"> = signal("error")
    stableContentState: Signal<"loading" | "success" | "error"> = this.#_stableContentState.asReadonly()
    #_stableContent: WritableSignal<THomeStableContent | null> = signal(null)
    stableContent: Signal<THomeStableContent | null> = this.#_stableContent.asReadonly()

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
