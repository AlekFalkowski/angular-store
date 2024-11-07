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
    selector: 'loading-process',
    host: {},
    templateUrl: 'loading-process.html',
    styleUrl: 'loading-process.scss',
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class LoadingProcess {
    @Output() tryAgain: EventEmitter<void> = new EventEmitter()
}
