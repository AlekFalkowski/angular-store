import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";
import { HomeViewModel } from "../model/HomeViewModel";
import { Meta, Title } from "@angular/platform-browser";
import { StoreAssortment } from "./rows/store-assortment";
import { HomeRemoteStorage } from "@/nodes/home/storages/HomeRemoteStorage";
import { GetHomeStableContentOption } from "@/nodes/home/options/GetHomeStableContent";
import { CardCollection } from "@/shared/display/panels/card-collection";
import { CatalogNotFoundNode } from "@/nodes/catalog/nodes/404/display/catalog-not-found-node";
import { CatalogSectionAssortment } from "@/nodes/catalog/nodes/section/display/rows/catalog-section-assortment";
import { EndColumnSlot } from "@/shared/display/templates/end-column-slot";
import { MainColumnSlot } from "@/shared/display/templates/main-column-slot";
import { TwoColumnTemplate } from "@/shared/display/templates/two-column-template";
import { LoadingProcess } from "@/shared/display/rows/loading-process";
import { LoadingError } from "@/shared/display/rows/loading-error";

@Component({
    imports: [
        CommonModule,
        RouterLink,
        PageBreadcrumbs,
        PageTitle,
        StoreAssortment,
        CardCollection,
        CatalogNotFoundNode,
        CatalogSectionAssortment,
        EndColumnSlot,
        MainColumnSlot,
        TwoColumnTemplate,
        LoadingProcess,
        LoadingError
    ],
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
    `,
    selector: 'home-node',
    host: { 'role': 'main' },
    template: `
        @switch (viewModel.stableContentState()) {
            @case ("loading") {
                <loading-process />
            }
            @case ("success") {
                <page-breadcrumbs />
                <page-title [title]="viewModel.stableContent()?.pageTitle ?? ''" />
                <!-- @if (viewModel.stableContent() !== null) { -->
                <store-assortment [cardCollection]="viewModel.stableContent()?.assortmentCardList ?? [{ T: 'TAssortmentCard', imageUrl: '', title: '', outLink: ''}]" />
                <!-- } -->
                      <!-- <div style="margin-top: 40px; padding-inline: var(&#45;&#45;inline-padding);" > -->
                      <!--     <div style="padding-block: 16px; display: flex; flex-direction: column;" > -->
                      <!--         <a [routerLink]="['/catalogs', 10]" >Go To Catalog 10</a > -->
                      <!--         <a [routerLink]="['/catalogs', 15]" >Go To Catalog 15</a > -->
                      <!--         <a routerLink="/catalogs/15/products/24" >Go To Product 24 from Catalog 15</a > -->
                      <!--         <a [routerLink]="['/orders', 211921]" >Go To Order 211921</a > -->
                      <!--         &lt;!&ndash; <a [routerLink]="['/orders/:orderNavId/product/:orderProductNavId', 211921, 54]">Go To Product 54 from Order 211921</a> &ndash;&gt; -->
                      <!--         <a routerLink="orders/211921/products/54" >Go To Product 54 from Order 211921</a > -->
                      <!--         <a [routerLink]="['/catals', 15]" >Go To Not Found Page</a > -->
                      <!--     </div > -->
                      <!-- </div > -->
            }
            @case ("error") {
                <loading-error (tryAgain)="viewModel.doStartInitialization()" />
            }
        }
    `,
    providers: [
        HomeViewModel,
        GetHomeStableContentOption,
        HomeRemoteStorage
    ]
})
export class HomeNode {
    viewModel: HomeViewModel = inject(HomeViewModel)
    htmlHeadTitleService: Title = inject(Title)
    // meta: Meta = inject(Meta)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.stableContent()?.htmlHeadTitle ?? '')
        // https://angular.dev/api/platform-browser/Meta?tab=api
        // this.meta.addTags([
        //     { name: 'twitter:card', content: 'summary_large_image' },
        //     { name: 'twitter:site', content: '@alligatorio' },
        //     ...
        // ]);
    }
}
