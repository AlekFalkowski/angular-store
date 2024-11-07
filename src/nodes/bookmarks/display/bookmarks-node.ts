import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { BookmarksViewModel } from "../model/BookmarksViewModel";
import { Title } from "@angular/platform-browser";
import { GetBookmarksStableContentOption } from "../options/GetBookmarksStableContentOption";
import { BookmarksRemoteStorage } from "../resources/BookmarksRemoteStorage";
import { PageTitle } from "@/shared/display/page-title/page-title";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";

@Component({
    imports: [
        PageBreadcrumbs,
        PageTitle
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'bookmarks-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div data-e="content">
            BOOKMARKS_PAGE_CONTENT
        </div>
    `,
    styles: `
        @import "all-config";
        bookmarks-node {
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
    encapsulation: ViewEncapsulation.None,
    providers: [
        BookmarksViewModel,
        GetBookmarksStableContentOption,
        BookmarksRemoteStorage
    ]
})
export class BookmarksNode {
    viewModel: BookmarksViewModel = inject(BookmarksViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
