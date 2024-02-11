import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BookmarksViewModel } from "../model/BookmarksViewModel";
import { Title } from "@angular/platform-browser";
import { GetBookmarksStableContentOption } from "../options/GetBookmarksStableContentOption";
import { BookmarksRemoteStorage } from "../storages/BookmarksRemoteStorage";
import { PageTitle } from "@/shared/display/rows/page-title";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";

@Component({
    imports: [ CommonModule, PageBreadcrumbs, PageTitle ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.Emulated,
    styles: `
        @import "all-config";
        :host {
            max-width: $base-max-width;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
        }
        :host > div {
            grid-column: 2;
            padding-inline: var(--inline-padding);
        }
    `,
    selector: 'bookmarks-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div>
            BOOKMARKS_PAGE_CONTENT
        </div>
    `,
    providers: [ BookmarksViewModel, GetBookmarksStableContentOption, BookmarksRemoteStorage ]
})
export class BookmarksNode {
    viewModel: BookmarksViewModel = inject(BookmarksViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
