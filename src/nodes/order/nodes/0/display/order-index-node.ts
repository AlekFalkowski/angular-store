import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { OrderList } from "./rows/order-list";
import { OrderRemoteStorage } from "../resources/OrderRemoteStorage";
import { GetOrderStableContentOption } from "../options/GetOrderStableContentOption";
import { OrderViewModel } from "../model/OrderViewModel";
import { Title } from "@angular/platform-browser";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";

@Component({
    imports: [
        CommonModule,
        PageBreadcrumbs,
        PageTitle,
        OrderList
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        order-index-node {
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
    selector: 'order-index-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <order-list />
        <div data-e="content" >
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
