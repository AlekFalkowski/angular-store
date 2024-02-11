import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
    imports: [ CommonModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
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
