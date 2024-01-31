import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CardCollection } from "../../../../shared/display/panels/card-collection";
import { TCardCollection } from "../../../../shared/types/TCardCollection";

@Component({
    imports: [ CommonModule, RouterLinkActive, RouterLink, CardCollection ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {

    grid-column: 2;
    padding-inline: var(--side-padding);
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
