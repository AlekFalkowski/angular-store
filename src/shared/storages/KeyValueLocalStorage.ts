import { computed, inject, Injectable, PLATFORM_ID, Signal, signal, WritableSignal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { TKeyValue } from "../types/TKeyValue";

@Injectable({ providedIn: 'root' })
export class KeyValueLocalStorage {
    #_platformId: Object = inject(PLATFORM_ID)

    #_lastSetKeyValue: WritableSignal<TKeyValue> = signal({ key: '', value: '' })
    lastSetKeyValue: Signal<TKeyValue> = this.#_lastSetKeyValue.asReadonly()

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event
            window.addEventListener('storage', (event) => {
                this.#_lastSetKeyValue.set({ key: event.key, value: event.newValue })
            })
        }
    }

    createSetValueMethod(key: string): (value: string) => void {
        return (value: string): void => {
            this.#_setValueByKey({
                key: key,
                value: value
            })
        }
    }

    #_setValueByKey(keyValueItem: TKeyValue): void {
        try {
            if (keyValueItem.key !== null && keyValueItem.value !== null) {
                localStorage.setItem(keyValueItem.key, keyValueItem.value)
                this.#_lastSetKeyValue.set({ key: keyValueItem.key, value: keyValueItem.value })
            }
        } catch (error) {
            throw error
        }
    }

    createObserveValueMethod(key: string): Signal<string | null> {
        let bufferedValue: string | null = this.#_getValueByKey(key)
        return computed(() => {
            const lastSetKeyValue: TKeyValue = this.lastSetKeyValue()
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
        try {
            localStorage.removeItem(key)
            this.#_lastSetKeyValue.set({ key: key, value: null })
        } catch (error) {
            throw error
        }
    }

    // removeAll(): void {
    //     try {
    //         localStorage.clear()
    //         this.#_lastSetKeyValue.set({ key: null, value: null })
    //     } catch (error) {
    //         throw error
    //     }
    // }
}
