import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReturnViewModel } from "../model/ReturnViewModel";
import { Title } from "@angular/platform-browser";
import { GetReturnStableContentOption } from "../options/GetReturnStableContentOption";
import { ReturnRemoteStorage } from "../resources/ReturnRemoteStorage";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";

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
        return-node {
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
    selector: 'return-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <div data-e="content" >
            RETURN_PAGE_CONTENT
        </div >
    `,
    providers: [
        ReturnViewModel,
        GetReturnStableContentOption,
        ReturnRemoteStorage
    ]
})
export class ReturnNode {
    viewModel: ReturnViewModel = inject(ReturnViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
