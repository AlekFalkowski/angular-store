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
    styleUrl: 'loading-error-cover.scss',
    selector: 'loading-error-cover',
    host: {},
    templateUrl: 'loading-error-cover.html',
    providers: []
})
export class LoadingErrorCover {
    @Output() tryAgain: EventEmitter<void> = new EventEmitter()
}
