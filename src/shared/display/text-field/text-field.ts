import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
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
    templateUrl: 'text-field.html',
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
