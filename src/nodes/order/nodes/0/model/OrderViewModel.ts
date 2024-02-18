import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetOrderStableContentOption } from "../options/GetOrderStableContentOption";
import { TOrderStableContent } from "../types/TOrderStableContent";

@Injectable()
export class OrderViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    readonly orderNavId = this.route.snapshot.params['orderNavId']
    #_getStableContentOption: GetOrderStableContentOption = inject(GetOrderStableContentOption)
    stableContent: TOrderStableContent | undefined
    readonly fakeStableContent = {
        htmlHeadTitle: `Заказ № ${ this.orderNavId }`,
        pageTitle: `Заказ № ${ this.orderNavId }`
    }

    constructor() {
        this.#_getStableContentOption.invoke().then((content) => {
            this.stableContent = content
        })
    }
}
