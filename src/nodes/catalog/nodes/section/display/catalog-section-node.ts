import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { ViewModel } from "../model/ViewModel";
import { GetDynamicContentOption } from "../options/GetDynamicContenOption";
import { GetStableContentOption } from "../options/GetStableContentOption";
import { RemoteStorage } from "../storages/RemoteStorage";
import { CatalogNotFound } from "@/nodes/catalog/shared/display/rows/catalog-not-found";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";
import { CardCollection } from "@/shared/display/panels/card-collection";
import { EndColumnSlot } from "@/shared/display/templates/end-column-slot";
import { MainColumnSlot } from "@/shared/display/templates/main-column-slot";
import { TwoColumnTemplate } from "@/shared/display/templates/two-column-template";
import { LoadingError } from "@/shared/display/rows/loading-error";
import { LoadingProcess } from "@/shared/display/rows/loading-process";

@Component({
    imports: [
        CommonModule,
        RouterLink,
        PageBreadcrumbs,
        PageTitle,
        CardCollection,
        EndColumnSlot,
        MainColumnSlot,
        TwoColumnTemplate,
        LoadingError,
        LoadingProcess,
        CatalogNotFound
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        catalog-section-node {
            max-width: $base-max-width;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
        }
    `,
    selector: 'catalog-section-node',
    host: { 'role': 'main' },
    template: `
        @switch (viewModel.stableContentState()) {
            @case ("loading") {
                <loading-process />
            }
            @case ("success") {
                <page-breadcrumbs />
                <page-title [title]="viewModel.stableContent()?.pageTitle ?? ''" />
                @if (viewModel.stableContent()?.filterConfig === undefined) {
                    <card-collection [cardCollection]="viewModel.fakeAssortmentCardList" />
                } @else {
                    <two-column-template openButtonText="Показать Фильтр" >
                        <main-column-slot >
                            <card-collection [cardCollection]="viewModel.fakeCatalogProductCardList" />
                        </main-column-slot >
                        <end-column-slot >
                            <div style="padding: 40px;" >
                                FILTER_COLUMN
                            </div >
                        </end-column-slot >
                    </two-column-template >
                }
            }
            @case ("404") {
                <catalog-not-found />
            }
            @case ("error") {
                <loading-error (tryAgain)="viewModel.doStartInitialization()" />
            }
        }
    `,
    providers: [
        ViewModel,
        GetStableContentOption,
        GetDynamicContentOption,
        RemoteStorage
    ]
})
export class CatalogSectionNode {
    viewModel: ViewModel = inject(ViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.stableContent()?.htmlHeadTitle ?? '')

    }
}
