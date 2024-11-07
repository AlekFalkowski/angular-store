import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TCardCollection } from "../../types/TCardCollection";

@Component({
    imports: [
        RouterLinkActive,
        RouterLink
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'card-collection',
    host: {},
    templateUrl: 'card-collection.html',
    styleUrl: 'card-collection.scss',
    encapsulation: ViewEncapsulation.None,
})
export class CardCollection {
    @Input() cardCollection!: TCardCollection
}
