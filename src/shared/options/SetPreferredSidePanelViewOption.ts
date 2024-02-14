import { Injectable } from "@angular/core";
import { Keys } from "@/shared/storages/Keys";
import { SetValueByKeyOption } from "@/shared/options/SetValueByKeyOption";

@Injectable({ providedIn: 'root' })
export class SetPreferredSidePanelViewOption extends SetValueByKeyOption {
    constructor() {
        super(Keys.PREFERRED_SIDE_PANEL_VIEW)
    }
}
