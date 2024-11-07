import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TextField } from "@/shared/display/text-field/text-field";

@Component({
    imports: [
        ReactiveFormsModule,
        TextField,
        FormsModule
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'test-text-field',
    host: {},
    templateUrl: 'test-text-field.html',
    styleUrl: 'test-text-field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class TestTextField {
    model = ""
}
