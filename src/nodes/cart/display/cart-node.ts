import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CartViewModel } from "../model/CartViewModel";
import { Title } from "@angular/platform-browser";
import { GetCartStableContentOption } from "../options/GetCartStableContentOption";
import { CartRemoteStorage } from "../storages/CartRemoteStorage";
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
    selector: 'cart-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <div>
            CART_PAGE_CONTENT
        </div>
    `,
    providers: [ CartViewModel, GetCartStableContentOption, CartRemoteStorage ]
})
export class CartNode {
    viewModel: CartViewModel = inject(CartViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
