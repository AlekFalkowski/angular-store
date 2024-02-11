import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
    imports: [ CommonModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.Emulated,
    styles: `
        @import "all-config";
        :host {
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
