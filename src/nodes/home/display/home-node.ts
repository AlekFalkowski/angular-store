import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";
import { PageTitle } from "@/shared/display/page-title/page-title";
import { Title } from "@angular/platform-browser";
import { StoreAssortment } from "./store-assortment/store-assortment";
import { CardCollection } from "@/shared/display/card-collection/card-collection";
import { CatalogNotFoundNode } from "@/nodes/catalog/nodes/404/display/catalog-not-found-node";
import { LoadingProcess } from "@/shared/display/loading-process/loading-process";
import { LoadingError } from "@/shared/display/loading-error/loading-error";
import { ViewModel } from "../model/ViewModel";
import { GetStableContentOption } from "../options/GetStableContentOption";
import { RemoteStorage } from "../resources/RemoteStorage";

@Component({
    imports: [
        RouterLink,
        PageBreadcrumbs,
        PageTitle,
        StoreAssortment,
        CardCollection,
        CatalogNotFoundNode,
        LoadingProcess,
        LoadingError
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'home-node',
    host: { 'role': 'main' },
    templateUrl: 'home-node.html',
    styleUrl: 'home-node.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [
        ViewModel,
        GetStableContentOption,
        RemoteStorage
    ]
})
export class HomeNode {
    viewModel: ViewModel = inject(ViewModel)
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
