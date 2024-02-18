import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { PaymentViewModel } from "../model/PaymentViewModel";
import { Title } from "@angular/platform-browser";
import { GetPaymentStableContentOption } from "../options/GetPaymentStableContentOption";
import { PaymentRemoteStorage } from "../resources/PaymentRemoteStorage";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";

@Component({
    imports: [
        CommonModule,
        PageBreadcrumbs,
        PageTitle
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        payment-node {
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
    selector: 'payment-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <div data-e="content" >
            PAYMENT_PAGE_CONTENT
        </div >
    `,
    providers: [
        PaymentViewModel,
        GetPaymentStableContentOption,
        PaymentRemoteStorage
    ]
})
export class PaymentNode {
    viewModel: PaymentViewModel = inject(PaymentViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
