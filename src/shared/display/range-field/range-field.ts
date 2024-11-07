import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'range-field',
    host: {},
    templateUrl: 'range-field.html',
    styleUrl: "range-field.scss",
    encapsulation: ViewEncapsulation.None,
})
export class RangeField { // Decorator for two text-fields
}
