import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { PageBreadcrumbs } from "../../../shared/display/rows/page-breadcrumbs";
import { PageTitle } from "../../../shared/display/rows/page-title";
import { AccountViewModel } from "../model/AccountViewModel";
import { Title } from "@angular/platform-browser";
import { GetAccountStableContentOption } from "../options/GetAccountStableContentOption";
import { AccountRemoteStorage } from "../storages/AccountRemoteStorage";

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
    selector: 'account-page',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div>
            ACCOUNT_PAGE_CONTENT
        </div>
    `,
    providers: [ AccountViewModel, GetAccountStableContentOption, AccountRemoteStorage ]
})
export class AccountPage {
    viewModel: AccountViewModel = inject(AccountViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
