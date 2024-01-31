import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetCompanyStableContentOption } from "../options/GetCompanyStableContentOption";
import { TCompanyStableContent } from "../types/TCompanyStableContent";

@Injectable()
export class CompanyViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetCompanyStableContentOption = inject(GetCompanyStableContentOption)
    public stableContent: TCompanyStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `О компании`,
            pageTitle: `О компании`
        }
    }
}
