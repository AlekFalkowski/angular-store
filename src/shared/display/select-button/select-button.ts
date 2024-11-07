import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from "@angular/core";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'select-button',
    host: {
        '[class]': 'appearance',
    },
    templateUrl: 'select-button.html',
    styleUrl: "select-button.scss",
    encapsulation: ViewEncapsulation.None,
})
export class SelectButton {
    @Input() appearance: 'outlined' | 'filled' = 'outlined'
    @Input() supportingText?: string
}
