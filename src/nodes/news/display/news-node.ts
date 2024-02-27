import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NewsViewModel } from "../model/NewsViewModel";
import { Title } from "@angular/platform-browser";
import { GetNewsStableContentOption } from "../options/GetNewsStableContentOption";
import { NewsRemoteStorage } from "../resources/NewsRemoteStorage";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";
import { PageTitle } from "@/shared/display/page-title/page-title";

@Component({
    imports: [
        CommonModule,
        PageBreadcrumbs,
        PageTitle
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        news-node {
            max-width: $base-max-width;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;

            & > [data-e="content"] {
                padding-inline: var(--inline-padding);
            }
        }
    `,
    selector: 'news-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <div data-e="content" >
            NEWS_PAGE_CONTENT
        </div >
    `,
    providers: [
        NewsViewModel,
        GetNewsStableContentOption,
        NewsRemoteStorage
    ]
})
export class NewsNode {
    viewModel: NewsViewModel = inject(NewsViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
