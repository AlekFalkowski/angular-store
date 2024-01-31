import { inject, Inject, Injectable, PLATFORM_ID, Signal, signal, WritableSignal } from "@angular/core";
import { TKeyValueItem } from "../types/TKeyValueItem";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class KeyValueLocalStorage {
    #_platformId: Object = inject(PLATFORM_ID)
    #_lastSetKeyValueItem: WritableSignal<TKeyValueItem> = signal({ key: '', value: '' })

    constructor() {
    }

    lastSetKeyValueItem: Signal<TKeyValueItem> = this.#_lastSetKeyValueItem.asReadonly()

    setValueByKey(keyValueItem: TKeyValueItem): void {
        try {
            localStorage.setItem(keyValueItem.key, keyValueItem.value)
            this.#_lastSetKeyValueItem.set({ key: keyValueItem.key, value: keyValueItem.value })
        } catch (error) {
            throw error
        }
    }
    // setValueByKey(key: string, value: string): void {
    //     localStorage.setItem(key, value)
    // }

    getValueByKey(key: string): string | null {
        if (isPlatformBrowser(this.#_platformId)) {
            return localStorage.getItem(key)
        } else {
            return null
        }
    }

    deleteValueByKey(key: string): void {
        localStorage.removeItem(key)
    }

    deleteAll(): void {
        localStorage.clear();
    }
}
