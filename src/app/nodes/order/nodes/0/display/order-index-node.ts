import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { OrderList } from "./rows/order-list";
import { OrderRemoteStorage } from "../storages/OrderRemoteStorage";
import { GetOrderStableContentOption } from "../options/GetOrderStableContentOption";
import { OrderViewModel } from "../model/OrderViewModel";
import { Title } from "@angular/platform-browser";
import { PageBreadcrumbs } from "@/app/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/app/shared/display/rows/page-title";

@Component({
    imports: [ CommonModule, PageBreadcrumbs, PageTitle, OrderList ],
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
    selector: 'order-index-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <order-list />
        <div >
            {{ viewModel.stableContent?.number }}
        </div >
    `,
    providers: [
        OrderViewModel,
        GetOrderStableContentOption,
        OrderRemoteStorage
    ]
})
export class OrderIndexNode {
    viewModel: OrderViewModel = inject(OrderViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
