import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PageBreadcrumbs } from "@/app/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/app/shared/display/rows/page-title";
import { HomeViewModel } from "../model/HomeViewModel";
import { Meta, Title } from "@angular/platform-browser";
import { StoreAssortment } from "./rows/store-assortment";

@Component({
    imports: [ CommonModule, RouterLink, PageBreadcrumbs, PageTitle, StoreAssortment ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
            @include PAGE_RULE_SET;
        }
        div {
            grid-column: 2;
            padding-inline: var(--side-padding);
            margin-top: 40px;
        }
        div > div {
            padding-block: 16px;
        }
    `,
    selector: 'index-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <store-assortment [cardCollection]="viewModel.fakeAssortmentCardList" />
        <div >
            <div style="display: flex; flex-direction: column; grid-column: 2;" >
                <a [routerLink]="['/catalogs', 10]" >Go To Catalog 10</a >
                <a [routerLink]="['/catalogs', 15]" >Go To Catalog 15</a >
                <a routerLink="/catalogs/15/products/24" >Go To Product 24 from Catalog 15</a >
                <a [routerLink]="['/orders', 211921]" >Go To Order 211921</a >
                <!-- <a [routerLink]="['/orders/:orderNavId/product/:orderProductNavId', 211921, 54]">Go To Product 54 from Order 211921</a> -->
                <a routerLink="orders/211921/products/54" >Go To Product 54 from Order 211921</a >
                <a [routerLink]="['/catals', 15]" >Go To Not Found Page</a >
            </div >
        </div >
    `,
    providers: [ HomeViewModel ]
})
export class IndexNode {
    viewModel: HomeViewModel = inject(HomeViewModel)
    htmlHeadTitleService: Title = inject(Title)
    meta: Meta = inject(Meta)
    elementRef: ElementRef = inject(ElementRef)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
        // https://angular.dev/api/platform-browser/Meta?tab=api
        this.meta.addTags([
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@alligatorio' },
            // ...
        ]);
    }
}
