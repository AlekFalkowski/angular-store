import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetAccountStableContentOption } from "../options/GetAccountStableContentOption";
import { TAccountStableContent } from "../types/TAccountStableContent";

@Injectable()
export class AccountViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetAccountStableContentOption = inject(GetAccountStableContentOption)
    public stableContent: TAccountStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Аккаунт`,
            pageTitle: `Аккаунт`
        }
    }
}
