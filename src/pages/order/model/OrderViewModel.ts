import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetOrderStableContentOption } from "../options/GetOrderStableContentOption";
import { TOrderStableContent } from "../types/TOrderStableContent";

@Injectable()
export class OrderViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    readonly orderNavId!: string
    private getStableContentOption: GetOrderStableContentOption = inject(GetOrderStableContentOption)
    public stableContent: TOrderStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        this.orderNavId = this.route.snapshot.params['orderNavId']
        this.getStableContentOption.invoke().then((content) => {
            this.stableContent = content
        })
        this.fakeStableContent = {
            htmlHeadTitle: `Заказ № ${ this.orderNavId }`,
            pageTitle: `Заказ № ${ this.orderNavId }`
        }
    }
}
