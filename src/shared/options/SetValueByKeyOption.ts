import { inject } from "@angular/core";
import { KeyValueLocalStorage } from "@/shared/storages/KeyValueLocalStorage";

export class SetValueByKeyOption {
    #_keyValueLocalStorage: KeyValueLocalStorage = inject(KeyValueLocalStorage)

    constructor(
          private key: string
    ) {
    }

    invoke(value: string): void {
        this.#_keyValueLocalStorage.setValueByKey({
            key: this.key,
            value: value
        })
    }
}
