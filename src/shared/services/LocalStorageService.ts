import { computed, inject, Injectable, PLATFORM_ID, Signal, signal, WritableSignal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { TKeyValue } from "../types/TKeyValue";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    #_platformId: Object = inject(PLATFORM_ID)

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
            window.addEventListener('storage', (event) => {
                this.#_lastSetKeyValue.set({ key: event.key, value: event.newValue })
            })
        }
    }

    #_lastSetKeyValue: WritableSignal<TKeyValue> = signal({ key: '', value: '' })

    createSetValueMethod(key: string): (value: string) => void {
        return (value: string): void => {
            this.#_setValueByKey({
                key: key,
                value: value
            })
        }
    }

    #_setValueByKey(keyValueItem: TKeyValue): void {
        if (isPlatformBrowser(this.#_platformId)) {
            if (keyValueItem.key !== null && keyValueItem.value !== null) {
                localStorage.setItem(keyValueItem.key, keyValueItem.value)
                this.#_lastSetKeyValue.set({ key: keyValueItem.key, value: keyValueItem.value })
            }
        }
    }

    createObserveValueMethod(key: string): Signal<string | null> {
        let bufferedValue: string | null = this.#_getValueByKey(key)
        return computed(() => {
            const lastSetKeyValue: TKeyValue = this.#_lastSetKeyValue()
            if (lastSetKeyValue.key === null || lastSetKeyValue.key === key) {
                bufferedValue = lastSetKeyValue.value
            }
            return bufferedValue
        })
    }

    #_getValueByKey(key: string): string | null {
        if (isPlatformBrowser(this.#_platformId)) {
            return localStorage.getItem(key)
        } else {
            return null
        }
    }

    createRemoveValueMethod(key: string): () => void {
        return (): void => {
            this.#_removeValueByKey(key)
        }
    }

    #_removeValueByKey(key: string): void {
        if (isPlatformBrowser(this.#_platformId)) {
            localStorage.removeItem(key)
            this.#_lastSetKeyValue.set({ key: key, value: null })
        }
    }

    // removeAll(): void {
    //     if (isPlatformBrowser(this.#_platformId)) {
    //         localStorage.clear()
    //         this.#_lastSetKeyValue.set({ key: null, value: null })
    //     }
    // }
}
