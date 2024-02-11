import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetNewsStableContentOption } from "../options/GetNewsStableContentOption";
import { TNewsStableContent } from "../types/TNewsStableContent";

@Injectable()
export class NewsViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetNewsStableContentOption = inject(GetNewsStableContentOption)
    public stableContent: TNewsStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Новости`,
            pageTitle: `Новости`
        }
    }
}
