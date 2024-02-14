import { Injectable } from "@angular/core";
import { Keys } from "@/shared/storages/Keys";
import { ObserveValueByKeyOption } from "@/shared/options/ObserveValueByKeyOption";

@Injectable()
export class ObservePreferredColorSchemeOption extends ObserveValueByKeyOption {
    constructor() {
        super(Keys.PREFERRED_COLOR_SCHEME)
    }
}

// @Injectable()
// export class ObservePreferredColorSchemeOption {
//     constructor() {
//         this.invoke = new ObserveValueByKeyOption(Keys.PREFERRED_COLOR_SCHEME).invoke
//     }
//     invoke: Signal<string | null>
// }
// @Injectable()
// export class ObservePreferredColorSchemeOption {
//     constructor() {
//         const observeValueByKeyOption = new ObserveValueByKeyOption(Keys.PREFERRED_COLOR_SCHEME)
//         this.invoke = observeValueByKeyOption.invoke
//     }
//     invoke: Signal<string | null>
// }
