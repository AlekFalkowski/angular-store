import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { AccountViewModel } from "../model/AccountViewModel";
import { Title } from "@angular/platform-browser";
import { GetAccountStableContentOption } from "../options/GetAccountStableContentOption";
import { AccountRemoteStorage } from "../resources/AccountRemoteStorage";
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
    selector: 'account-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div data-e="content">
            ACCOUNT_PAGE_CONTENT
        </div>
    `,
    styles: `
        @import "all-config";
        account-node {
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
