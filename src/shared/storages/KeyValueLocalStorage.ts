import { inject, Injectable, PLATFORM_ID, Signal, signal, WritableSignal } from "@angular/core";
import { TKeyValue } from "../types/TKeyValue";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class KeyValueLocalStorage {
    #_platformId: Object = inject(PLATFORM_ID)
    #_lastSetKeyValue: WritableSignal<TKeyValue> = signal({ key: '', value: '' })

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
            window.addEventListener('storage', (event) => {
                this.#_lastSetKeyValue.set({ key: event.key ?? '', value: event.newValue ?? '' })
            })
        }
    }

    lastSetKeyValue: Signal<TKeyValue> = this.#_lastSetKeyValue.asReadonly()

    setValueByKey(keyValueItem: TKeyValue): void {
        try {
            localStorage.setItem(keyValueItem.key, keyValueItem.value)
            this.#_lastSetKeyValue.set({ key: keyValueItem.key, value: keyValueItem.value })
        } catch (error) {
            throw error
        }
    }

    getValueByKey(key: string): string | null {
        if (isPlatformBrowser(this.#_platformId)) {
            return localStorage.getItem(key)
        } else {
            return null
        }
    }

    // deleteValueByKey(key: string): void {
    //     localStorage.removeItem(key)
    // }

    // deleteAll(): void {
    //     localStorage.clear();
    // }
}
