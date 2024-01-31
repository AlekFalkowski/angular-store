import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetReturnStableContentOption } from "../options/GetReturnStableContentOption";
import { TReturnStableContent } from "../types/TReturnStableContent";

@Injectable()
export class ReturnViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetReturnStableContentOption = inject(GetReturnStableContentOption)
    public stableContent: TReturnStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Возврат`,
            pageTitle: `Возврат`
        }
    }
}
