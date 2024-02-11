import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ServiceViewModel } from "../model/ServiceViewModel";
import { Title } from "@angular/platform-browser";
import { GetServiceStableContentOption } from "../options/GetServiceStableContentOption";
import { ServiceRemoteStorage } from "../storages/ServiceRemoteStorage";
import { PageBreadcrumbs } from "@/app/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/app/shared/display/rows/page-title";

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
    selector: 'service-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <div >
            SERVICE_PAGE_CONTENT
        </div >
    `,
    providers: [
        ServiceViewModel,
        GetServiceStableContentOption,
        ServiceRemoteStorage
    ]
})
export class ServiceNode {
    viewModel: ServiceViewModel = inject(ServiceViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
