// import { computed, inject, Signal } from "@angular/core";
// import { KeyValueLocalStorage } from "../storages/KeyValueLocalStorage";
// import { TKeyValue } from "../types/TKeyValue";
//
// export class ObserveLocalValueOption {
//     #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)
//     #_bufferedValue: string | null
//
//     constructor(
//           private key: string
//     ) {
//         this.#_bufferedValue = this.#_keyValueLocalStorage.getValueByKey(this.key)
//     }
//
//     invoke: Signal<string | null> = computed(() => {
//         const lastSetKeyValue: TKeyValue = this.#_keyValueLocalStorage.lastSetKeyValue()
//         if (lastSetKeyValue.key === null || lastSetKeyValue.key === this.key) {
//             this.#_bufferedValue = lastSetKeyValue.value
//         }
//         return this.#_bufferedValue
//     })
// }
