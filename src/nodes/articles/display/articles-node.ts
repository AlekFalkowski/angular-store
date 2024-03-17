import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { ArticlesViewModel } from "../model/ArticlesViewModel";
import { Title } from "@angular/platform-browser";
import { GetArticlesStableContentOption } from "../options/GetArticlesStableContentOption";
import { ArticlesRemoteStorage } from "../resources/ArticlesRemoteStorage";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";
import { PageTitle } from "@/shared/display/page-title/page-title";

@Component({
    imports: [
        PageBreadcrumbs,
        PageTitle
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        articles-node {
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
    selector: 'articles-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div data-e="content">
            ARTICLES_PAGE_CONTENT
        </div>
    `,
    providers: [
        ArticlesViewModel,
        GetArticlesStableContentOption,
        ArticlesRemoteStorage
    ]
})
export class ArticlesNode {
    viewModel: ArticlesViewModel = inject(ArticlesViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
