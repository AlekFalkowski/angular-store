import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TCardCollection } from "@/shared/types/TCardCollection";
import { CardCollection } from "@/shared/display/card-collection/card-collection";

@Component({
    imports: [
        RouterLinkActive,
        RouterLink,
        CardCollection
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'store-assortment',
    host: {},
    templateUrl: 'store-assortment.html',
    styleUrl: 'store-assortment.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [],
})
export class StoreAssortment {
    @Input() cardCollection!: TCardCollection
}
