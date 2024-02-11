import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AccountViewModel } from "../model/AccountViewModel";
import { Title } from "@angular/platform-browser";
import { GetAccountStableContentOption } from "../options/GetAccountStableContentOption";
import { AccountRemoteStorage } from "../storages/AccountRemoteStorage";
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
    selector: 'account-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <div >
            ACCOUNT_PAGE_CONTENT
        </div >
    `,
    providers: [
        AccountViewModel,
        GetAccountStableContentOption,
        AccountRemoteStorage
    ]
})
export class AccountNode {
    viewModel: AccountViewModel = inject(AccountViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
