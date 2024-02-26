import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { CatalogSectionFilter } from "./panels/catalog-section-filter";
import { CatalogNotFound } from "@/nodes/catalog/shared/display/rows/catalog-not-found";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";
import { CardCollection } from "@/shared/display/panels/card-collection";
import { EndColumnSlot } from "@/shared/display/templates/end-column-slot";
import { MainColumnSlot } from "@/shared/display/templates/main-column-slot";
import { TwoColumnTemplate } from "@/shared/display/templates/two-column-template";
import { LoadingError } from "@/shared/display/rows/loading-error";
import { LoadingProcess } from "@/shared/display/rows/loading-process";
import { ViewModel } from "../model/ViewModel";
import { GetStableContentOption } from "../options/GetStableContentOption";
import { GetDynamicContentOption } from "../options/GetDynamicContenOption";
import { ObserveQueryStringOption } from "../options/ObserveQueryStringOption";
import { SaveQueryStringOption } from "../options/SaveQueryStringOption";
import { LocalStorage } from "../resources/LocalStorage";
import { RemoteStorage } from "../resources/RemoteStorage";

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
        CatalogNotFound,
        FormsModule,
        CatalogSectionFilter
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
                <!-- <a routerLink="/catalogs/1/sections/1" >Go To /catalogs/1/sections/1</a > -->
                <!-- <a routerLink="/catalogs/1/sections/2" >Go To /catalogs/1/sections/2</a > -->
                <!-- <a routerLink="/catalogs/1/sections/3" >Go To /catalogs/1/sections/3</a > -->
                <page-title [title]="viewModel.stableContent()?.pageTitle ?? ''" />
                @if (viewModel.stableContent()?.filterConfig) {
                    <two-column-template openButtonText="Показать Фильтр" >
                        <main-column-slot >
                            <card-collection [cardCollection]="viewModel.fakeCatalogProductCardList" />
                        </main-column-slot >
                        <end-column-slot >
                            <catalog-section-filter
                                  [filterConfig]="viewModel.stableContent()?.filterConfig ?? []"
                                  [multiChoiceFieldsStates]="viewModel.multiChoiceFieldStates"
                                  [singleChoiceFieldsStates]="viewModel.singleChoiceFieldStates"
                                  [textFieldsStates]="viewModel.textFieldStates"
                                  (submitFilter)="viewModel.getDynamicContent()"
                                  (cleanFilter)="viewModel.cleanFieldStates()"
                            />
                        </end-column-slot >
                    </two-column-template >
                } @else {
                    <card-collection [cardCollection]="viewModel.fakeAssortmentCardList" />
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
        GetDynamicContentOption,
        GetStableContentOption,
        ObserveQueryStringOption,
        SaveQueryStringOption,
        RemoteStorage,
        LocalStorage
    ]
})
export class CatalogSectionNode {
    viewModel: ViewModel = inject(ViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.stableContent()?.htmlHeadTitle ?? '')
    }
}
