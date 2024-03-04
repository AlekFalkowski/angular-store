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
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'store-assortment.scss',
    selector: 'store-assortment',
    host: {},
    templateUrl: 'store-assortment.html',
    providers: [],
})
export class StoreAssortment {
    @Input() cardCollection!: TCardCollection
}
