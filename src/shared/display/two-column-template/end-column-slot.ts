import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        end-column-slot {
            display: block;
        }
    `,
    selector: 'end-column-slot',
    host: {},
    template: `
        <ng-content />
    `,
})
export class EndColumnSlot {
}
