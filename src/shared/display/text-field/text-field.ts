import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA, EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: "text-field.scss",
    selector: 'text-field',
    host: {},
    template: `
        <input data-e="input" type="text"
               placeholder=" "
               [class]="variant"
               [class.error]="error"
               [disabled]="disabled"
               [name]="name"
               [value]="value"
               [ngModel]="currentValue"
               (ngModelChange)="changeValue.emit($event)"
        >
        <label data-e="label" >{{ label }}</label >
        <div data-e="ground" aria-hidden="true" ></div >
        <div data-e="overlay" aria-hidden="true" ></div >
        <div data-e="indicator" aria-hidden="true" ></div >
        <!--            <span data-e="count" aria-hidden="true">88</span>-->
        <!--            <SvgDropdown data-e="icon" aria-hidden="true"/>-->
        @if (helpText) {
            <div data-e="help-text" >
                {{ helpText }}
            </div >
        }
    `,
})
export class TextField {
    @Input() label: string = ''
    @Input() name!: string
    @Input() value?: string = ''
    @Input() helpText?: string
    @Input() variant: 'framed' | 'tonal' = 'framed'
    @Input() error: boolean = false
    @Input() disabled: boolean = false

    @Input() currentValue?: string
    @Output() changeValue: EventEmitter<string> = new EventEmitter()
}
