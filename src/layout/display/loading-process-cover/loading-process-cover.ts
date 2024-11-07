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
    selector: 'loading-process-cover',
    host: {},
    templateUrl: 'loading-process-cover.html',
    styleUrl: 'loading-process-cover.scss',
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class LoadingProcessCover {
    @Output() tryAgain: EventEmitter<void> = new EventEmitter()
}
