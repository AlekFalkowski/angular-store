import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";
import { HomeViewModel } from "../model/HomeViewModel";
import { Meta, Title } from "@angular/platform-browser";
import { StoreAssortment } from "./rows/store-assortment";

@Component({
    imports: [ CommonModule, RouterLink, PageBreadcrumbs, PageTitle, StoreAssortment ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        home-node {
            max-width: $base-max-width;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
        }
        .mobile-in-portrait-only {
            display: none;
            @include ONLY_FOR_MOBILE_IN_PORTRAIT {
                display: block;
            }
        }
        .mobile-in-landscape-only {
            display: none;
            @include ONLY_FOR_MOBILE_IN_LANDSCAPE {
                display: block;
            }
        }
        .mobile-in-all-orientation {
            display: none;
            @include ONLY_FOR_MOBILE_IN_ALL_ORIENTATION {
                display: block;
            }
        }
    `,
    selector: 'home-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        <store-assortment [cardCollection]="viewModel.fakeAssortmentCardList" />
        <div style="margin-top: 40px; padding-inline: var(--inline-padding);" >
            <div style="padding-block: 16px; display: flex; flex-direction: column; grid-column: 2;" >
                <a [routerLink]="['/catalogs', 10]" >Go To Catalog 10</a >
                <a [routerLink]="['/catalogs', 15]" >Go To Catalog 15</a >
                <a routerLink="/catalogs/15/products/24" >Go To Product 24 from Catalog 15</a >
                <a [routerLink]="['/orders', 211921]" >Go To Order 211921</a >
                <!-- <a [routerLink]="['/orders/:orderNavId/product/:orderProductNavId', 211921, 54]">Go To Product 54 from Order 211921</a> -->
                <a routerLink="orders/211921/products/54" >Go To Product 54 from Order 211921</a >
                <a [routerLink]="['/catals', 15]" >Go To Not Found Page</a >
            </div >
        </div >
        <div style="margin-top: 40px; padding-inline: var(--inline-padding);" >
            <div class="mobile-in-portrait-only" >mobile-in-portrait-only</div >
            <div class="mobile-in-landscape-only" >mobile-in-landscape-only</div >
            <div class="mobile-in-all-orientation" >mobile-in-all-orientation</div >
        </div >
    `,
    providers: [ HomeViewModel ]
})
export class HomeNode {
    viewModel: HomeViewModel = inject(HomeViewModel)
    htmlHeadTitleService: Title = inject(Title)
    meta: Meta = inject(Meta)
    elementRef: ElementRef = inject(ElementRef)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
        // https://angular.dev/api/platform-browser/Meta?tab=api
        this.meta.addTags([
            // { name: 'twitter:card', content: 'summary_large_image' },
            // { name: 'twitter:site', content: '@alligatorio' },
            // ...
        ]);
    }
}
