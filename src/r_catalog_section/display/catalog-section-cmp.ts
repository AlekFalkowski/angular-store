import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";
import { CatalogSectionsViewModel } from "../model/CatalogSectionsViewModel";
import { Title } from "@angular/platform-browser";
import { CatalogSectionAssortment } from "./rows/catalog-section-assortment";

@Component({
    imports: [ CommonModule, RouterLink, PageBreadcrumbs, PageTitle, CatalogSectionAssortment ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
            @include PAGE_RULE_SET;
        }
    `,
    selector: 'catalog-section-cmp',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title [title]="viewModel.fakeStableContent.pageTitle"/>
        <catalog-section-assortment [cardCollection]="viewModel.fakeAssortmentCardList"/>
    `,
    providers: [ CatalogSectionsViewModel ]
})
export class CatalogSectionCmp {
    viewModel: CatalogSectionsViewModel = inject(CatalogSectionsViewModel)
    htmlHeadTitleService: Title = inject(Title)
    elementRef: ElementRef = inject(ElementRef)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
    }
}
