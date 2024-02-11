import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetCartStableContentOption } from "../options/GetCartStableContentOption";
import { TCartStableContent } from "../types/TCartStableContent";

@Injectable()
export class CartViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetCartStableContentOption = inject(GetCartStableContentOption)
    public stableContent: TCartStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Корзина`,
            pageTitle: `Корзина`
        }
    }
}
