import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetDeliveryStableContentOption } from "../options/GetDeliveryStableContentOption";
import { TDeliveryStableContent } from "../types/TDeliveryStableContent";

@Injectable()
export class DeliveryViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetDeliveryStableContentOption = inject(GetDeliveryStableContentOption)
    public stableContent: TDeliveryStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Доставка`,
            pageTitle: `Доставка`
        }
    }
}
