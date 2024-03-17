import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CompanyViewModel } from "../model/CompanyViewModel";
import { Title } from "@angular/platform-browser";
import { GetCompanyStableContentOption } from "../options/GetCompanyStableContentOption";
import { CompanyRemoteStorage } from "../resources/CompanyRemoteStorage";
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
        company-node {
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
    selector: 'company-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div data-e="content">
            COMPANY_PAGE_CONTENT
        </div>
    `,
    providers: [
        CompanyViewModel,
        GetCompanyStableContentOption,
        CompanyRemoteStorage
    ]
})
export class CompanyNode {
    viewModel: CompanyViewModel = inject(CompanyViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
