import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class OrderProductViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    readonly orderNavId!: string
    readonly orderProductNavId!: string
    // private getStableContentOption: GetStableContentOption = inject(GetStableContentOption)
    // public stableContent: StableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        this.orderNavId = this.route.snapshot.params['orderNavId']
        this.orderProductNavId = this.route.snapshot.params['orderProductNavId']
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Продукт № ${ this.orderProductNavId } из заказа № ${ this.orderNavId }`,
            pageTitle: `Продукт № ${ this.orderProductNavId } из заказа № ${ this.orderNavId }`
        }
    }
}
