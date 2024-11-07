import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { BaseButton } from "@/shared/display/base-button/base-button";

@Component({
    imports: [
        BaseButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'loading-error',
    host: {},
    templateUrl: 'loading-error.html',
    styleUrl: 'loading-error.scss',
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class LoadingError {
    @Output() tryAgain: EventEmitter<void> = new EventEmitter()
}
