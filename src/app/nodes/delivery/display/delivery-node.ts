import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DeliveryViewModel } from "../model/DeliveryViewModel";
import { Title } from "@angular/platform-browser";
import { GetDeliveryStableContentOption } from "../options/GetDeliveryStableContentOption";
import { DeliveryRemoteStorage } from "../storages/DeliveryRemoteStorage";
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
    selector: 'delivery-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <div >
            DELIVERY_PAGE_CONTENT
        </div >
    `,
    providers: [
        DeliveryViewModel,
        GetDeliveryStableContentOption,
        DeliveryRemoteStorage
    ]
})
export class DeliveryNode {
    viewModel: DeliveryViewModel = inject(DeliveryViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
