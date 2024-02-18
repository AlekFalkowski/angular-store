import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class OrderProductViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    readonly orderNavId = this.route.snapshot.params['orderNavId']
    readonly orderProductNavId = this.route.snapshot.params['orderProductNavId']
    readonly fakeStableContent = {
        htmlHeadTitle: `Продукт № ${ this.orderProductNavId } из заказа № ${ this.orderNavId }`,
        pageTitle: `Продукт № ${ this.orderProductNavId } из заказа № ${ this.orderNavId }`
    }
}
