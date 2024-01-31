import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetBookmarksStableContentOption } from "../options/GetBookmarksStableContentOption";
import { TBookmarksStableContent } from "../types/TBookmarksStableContent";

@Injectable()
export class BookmarksViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetBookmarksStableContentOption = inject(GetBookmarksStableContentOption)
    public stableContent: TBookmarksStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Закладки`,
            pageTitle: `Закладки`
        }
    }
}
