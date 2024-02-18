import { Injectable } from "@angular/core";
import { TArticlesStableContent } from "../types/TArticlesStableContent";

@Injectable()
export class ArticlesViewModel {
    readonly fakeStableContent = {
        htmlHeadTitle: `Статьи`,
        pageTitle: `Статьи`
    }
    public stableContent: TArticlesStableContent | undefined
}
