import { Injectable } from "@angular/core";
import { Keys } from "@/shared/storages/Keys";
import { ObserveValueByKeyOption } from "@/shared/options/ObserveValueByKeyOption";

@Injectable({ providedIn: 'root' })
export class ObservePreferredSidePanelViewOption extends ObserveValueByKeyOption {
    constructor() {
        super(Keys.PREFERRED_SIDE_PANEL_VIEW)
    }
}
