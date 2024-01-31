import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetArticlesStableContentOption } from "../options/GetArticlesStableContentOption";
import { TArticlesStableContent } from "../types/TArticlesStableContent";

@Injectable()
export class ArticlesViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetArticlesStableContentOption = inject(GetArticlesStableContentOption)
    public stableContent: TArticlesStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Статьи`,
            pageTitle: `Статьи`
        }
    }
}
