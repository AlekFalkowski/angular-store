import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        main-column-slot {
            display: block;
        }
    `,
    selector: 'main-column-slot',
    host: {},
    template: `
        <ng-content />
    `,
})
export class MainColumnSlot {
}
