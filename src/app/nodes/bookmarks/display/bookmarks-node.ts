import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BookmarksViewModel } from "../model/BookmarksViewModel";
import { Title } from "@angular/platform-browser";
import { GetBookmarksStableContentOption } from "../options/GetBookmarksStableContentOption";
import { BookmarksRemoteStorage } from "../storages/BookmarksRemoteStorage";
import { PageTitle } from "@/app/shared/display/rows/page-title";
import { PageBreadcrumbs } from "@/app/shared/display/rows/page-breadcrumbs";

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
