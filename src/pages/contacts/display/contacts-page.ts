import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { PageBreadcrumbs } from "../../../shared/display/rows/page-breadcrumbs";
import { PageTitle } from "../../../shared/display/rows/page-title";
import { ContactsViewModel } from "../model/ContactsViewModel";
import { Title } from "@angular/platform-browser";
import { GetContactsStableContentOption } from "../options/GetContactsStableContentOption";
import { ContactsRemoteStorage } from "../storages/ContactsRemoteStorage";

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
    selector: 'contacts-page',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div>
            CONTACTS_PAGE_CONTENT
        </div>
    `,
    providers: [ ContactsViewModel, GetContactsStableContentOption, ContactsRemoteStorage ]
})
export class ContactsPage {
    viewModel: ContactsViewModel = inject(ContactsViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
