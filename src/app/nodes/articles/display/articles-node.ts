import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ArticlesViewModel } from "../model/ArticlesViewModel";
import { Title } from "@angular/platform-browser";
import { GetArticlesStableContentOption } from "../options/GetArticlesStableContentOption";
import { ArticlesRemoteStorage } from "../storages/ArticlesRemoteStorage";
import { PageBreadcrumbs } from "@/app/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/app/shared/display/rows/page-title";

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
    selector: 'articles-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <div >
            ARTICLES_PAGE_CONTENT
        </div >
    `,
    providers: [
        ArticlesViewModel,
        GetArticlesStableContentOption,
        ArticlesRemoteStorage ]
})
export class ArticlesNode {
    viewModel: ArticlesViewModel = inject(ArticlesViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
