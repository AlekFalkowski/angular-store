import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'loading-error.scss',
    selector: 'loading-error',
    host: {},
    templateUrl: 'loading-error.html',
    providers: []
})
export class LoadingError {
    @Output() tryAgain: EventEmitter<void> = new EventEmitter()
}
