import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetPaymentStableContentOption } from "../options/GetPaymentStableContentOption";
import { TPaymentStableContent } from "../types/TPaymentStableContent";

@Injectable()
export class PaymentViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetPaymentStableContentOption = inject(GetPaymentStableContentOption)
    public stableContent: TPaymentStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Способы оплаты`,
            pageTitle: `Способы оплаты`
        }
    }
}
