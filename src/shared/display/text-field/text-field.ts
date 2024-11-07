import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from "@angular/core";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'text-field',
    host: {
        '[class]': 'appearance',
    },
    templateUrl: 'text-field.html',
    styleUrl: "text-field.scss",
    encapsulation: ViewEncapsulation.None,
})
export class TextField {
    @Input() appearance: 'outlined' | 'filled' = 'outlined'
    @Input() supportingText?: string
}
