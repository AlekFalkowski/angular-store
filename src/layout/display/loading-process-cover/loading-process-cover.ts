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
    styleUrl: 'loading-process-cover.scss',
    selector: 'loading-process-cover',
    host: {},
    templateUrl: 'loading-process-cover.html',
    providers: []
})
export class LoadingProcessCover {
    @Output() tryAgain: EventEmitter<void> = new EventEmitter()
}
