import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CatalogSectionsViewModel } from "../model/CatalogSectionsViewModel";
import { Title } from "@angular/platform-browser";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";
import { CardCollection } from "@/shared/display/panels/card-collection";
import { EndColumnSlot } from "@/shared/display/templates/end-column-slot";
import { MainColumnSlot } from "@/shared/display/templates/main-column-slot";
import { TwoColumnTemplate } from "@/shared/display/templates/two-column-template";
import { GetCatalogSectionStableContentOption } from "../options/GetCatalogSectionStableContentOption";
import { CatalogSectionRemoteStorage } from "../storages/CatalogSectionRemoteStorage";
import { LoadingError } from "@/shared/display/rows/loading-error";
import { LoadingProcess } from "@/shared/display/rows/loading-process";
import { CatalogNotFound } from "@/nodes/catalog/shared/display/rows/catalog-not-found";

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

            & > [data-e="loading"],
            & > [data-e="error"] {
                margin-top: 74px;
                color: var(--md-sys-color-primary);
                @include MD3_DISPLAY_S_FONT_RULE_SET;
                text-transform: uppercase;
                text-align: center;
                text-wrap: balance;
            }
            & > [data-e="try-loading-button"] {
                margin-top: 48px;
            }
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
        CatalogSectionsViewModel,
        GetCatalogSectionStableContentOption,
        CatalogSectionRemoteStorage
    ]
})
export class CatalogSectionNode {
    viewModel: CatalogSectionsViewModel = inject(CatalogSectionsViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.stableContent()?.htmlHeadTitle ?? '')
    }
}
