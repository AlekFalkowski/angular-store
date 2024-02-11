import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CompanyViewModel } from "../model/CompanyViewModel";
import { Title } from "@angular/platform-browser";
import { GetCompanyStableContentOption } from "../options/GetCompanyStableContentOption";
import { CompanyRemoteStorage } from "../storages/CompanyRemoteStorage";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";

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
    selector: 'company-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <div >
            COMPANY_PAGE_CONTENT
        </div >
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
