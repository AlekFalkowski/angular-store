import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { PageBreadcrumbs } from "../../../shared/display/rows/page-breadcrumbs";
import { PageTitle } from "../../../shared/display/rows/page-title";
import { NewsViewModel } from "../model/NewsViewModel";
import { Title } from "@angular/platform-browser";
import { GetNewsStableContentOption } from "../options/GetNewsStableContentOption";
import { NewsRemoteStorage } from "../storages/NewsRemoteStorage";

@Component({
    imports: [ CommonModule, PageBreadcrumbs, PageTitle ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
            @include PAGE_RULE_SET;
        }
        :host > div {

    grid-column: 2;
    padding-inline: var(--side-padding);
        }
    `,
    selector: 'news-page',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div>
            NEWS_PAGE_CONTENT
        </div>
    `,
    providers: [ NewsViewModel, GetNewsStableContentOption, NewsRemoteStorage ]
})
export class NewsPage {
    viewModel: NewsViewModel = inject(NewsViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
