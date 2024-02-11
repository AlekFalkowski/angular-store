import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CardCollection } from "@/shared/display/panels/card-collection";
import { TCardCollection } from "@/shared/types/TCardCollection";

@Component({
    imports: [
        CommonModule,
        RouterLinkActive,
        RouterLink,
        CardCollection
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.Emulated,
    styles: `
        @import "all-config";
        :host {
            grid-column: 2;
            padding-inline: var(--inline-padding);
        }
    `,
    selector: 'catalog-section-assortment',
    host: {},
    template: `
        <card-collection [cardCollection]="cardCollection" />
    `,
})
export class CatalogSectionAssortment {
    @Input() cardCollection!: TCardCollection

    constructor() {
    }
}
