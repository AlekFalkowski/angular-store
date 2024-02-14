import { Injectable } from "@angular/core";
import { Keys } from "@/shared/storages/Keys";
import { SetValueByKeyOption } from "@/shared/options/SetValueByKeyOption";

@Injectable()
export class SetPreferredColorSchemeOption extends SetValueByKeyOption {
    constructor() {
        super(Keys.PREFERRED_COLOR_SCHEME)
    }
}
