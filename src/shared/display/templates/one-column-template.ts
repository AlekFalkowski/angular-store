import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    imports: [ CommonModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        one-column-template {
            display: grid;
            grid-template-columns: $layout-template-columns;
            grid-auto-rows: min-content;
        }
    `,
    selector: 'one-column-template',
    host: {},
    template: `
        <ng-content />
    `,
    // providers: []
})
export class OneColumnTemplate {
}
