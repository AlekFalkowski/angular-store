import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetNewsStableContentOption } from "../options/GetNewsStableContentOption";
import { TNewsStableContent } from "../types/TNewsStableContent";

@Injectable()
export class NewsViewModel {
    readonly fakeStableContent= {
        htmlHeadTitle: `Новости`,
        pageTitle: `Новости`
    }
}
