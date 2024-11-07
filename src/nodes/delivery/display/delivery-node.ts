import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { DeliveryViewModel } from "../model/DeliveryViewModel";
import { Title } from "@angular/platform-browser";
import { GetDeliveryStableContentOption } from "../options/GetDeliveryStableContentOption";
import { DeliveryRemoteStorage } from "../resources/DeliveryRemoteStorage";
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
    selector: 'delivery-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div data-e="content">
            DELIVERY_PAGE_CONTENT
        </div>
    `,
    styles: `
        @import "all-config";
        delivery-node {
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
