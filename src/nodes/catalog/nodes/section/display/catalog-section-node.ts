import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    inject,
    ViewEncapsulation
} from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CatalogSectionsViewModel } from "../model/CatalogSectionsViewModel";
import { Title } from "@angular/platform-browser";
import { CatalogSectionAssortment } from "./rows/catalog-section-assortment";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";
import { CardCollection } from "@/shared/display/panels/card-collection";
import { EndColumnSlot } from "@/shared/display/templates/end-column-slot";
import { MainColumnSlot } from "@/shared/display/templates/main-column-slot";
import { TwoColumnTemplate } from "@/shared/display/templates/two-column-template";
import {
    GetCatalogSectionStableContentOption
} from "@/nodes/catalog/nodes/section/options/GetCatalogSectionStableContentOption";

@Component({
    imports: [
        CommonModule,
        RouterLink,
        PageBreadcrumbs,
        PageTitle,
        CatalogSectionAssortment,
        CardCollection,
        EndColumnSlot,
        MainColumnSlot,
        TwoColumnTemplate
    ],
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
    `,
    selector: 'catalog-section-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title [title]="viewModel.fakeStableContent.pageTitle" />
        @if (viewModel.stableContent?.filterConfig === undefined) {
            <catalog-section-assortment [cardCollection]="viewModel.fakeAssortmentCardList" />
        } @else {
            <two-column-template openButtonText="Показать Фильтр" >
                <main-column-slot >
                    <card-collection [cardCollection]="viewModel.fakeCatalogProductCardList" />
                </main-column-slot >
                <end-column-slot >
                    <div style="padding-inline: 40px;" >
                        <input type="text" style="height: 36px;" >
                    </div >
                    <div style="padding-inline: 40px;" >
                        <input type="text" style="height: 36px;" >
                    </div >
                </end-column-slot >
            </two-column-template >
        }
    `,
    providers: [
        CatalogSectionsViewModel,
        GetCatalogSectionStableContentOption
    ]
})
export class CatalogSectionNode {
    viewModel: CatalogSectionsViewModel = inject(CatalogSectionsViewModel)
    htmlHeadTitleService: Title = inject(Title)
    elementRef: ElementRef = inject(ElementRef)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
