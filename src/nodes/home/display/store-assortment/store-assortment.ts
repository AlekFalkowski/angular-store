import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TCardCollection } from "@/shared/types/TCardCollection";
import { CardCollection } from "@/shared/display/card-collection/card-collection";

@Component({
    imports: [ CommonModule, RouterLinkActive, RouterLink, CardCollection ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        store-assortment {

            & > [data-e="title"] {
                margin-bottom: 56px;
                padding-inline: var(--inline-padding);
                color: var(--md-sys-color-primary);
                @include MD3_HEADLINE_L_FONT_RULE_SET;
                text-transform: uppercase;
                text-align: center;
                text-wrap: balance;
            }
        }
    `,
    selector: 'store-assortment',
    host: {},
    template: `
        <h2 data-e="title" >Наш ассортимент</h2 >
        <card-collection [cardCollection]="cardCollection" />
    `,
})
export class StoreAssortment {
    @Input() cardCollection!: TCardCollection
}
