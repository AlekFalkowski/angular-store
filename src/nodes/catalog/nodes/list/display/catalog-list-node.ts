import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { CatalogListViewModel } from "../model/CatalogListViewModel";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";
import { PageTitle } from "@/shared/display/page-title/page-title";
import { CardCollection } from "@/shared/display/card-collection/card-collection";

@Component({
    imports: [
        CommonModule,
        RouterModule,
        PageBreadcrumbs,
        PageTitle,
        CardCollection
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        catalog-list-node {
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
    selector: 'catalog-list-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div data-e="content">
            CATALOG_LIST_PAGE_CONTENT
        </div>
    `,
    providers: [
        CatalogListViewModel
    ]
})
export class CatalogListNode {
    viewModel: CatalogListViewModel = inject(CatalogListViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
