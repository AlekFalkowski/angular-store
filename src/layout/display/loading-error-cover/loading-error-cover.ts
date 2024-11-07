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
    selector: 'loading-error-cover',
    host: {},
    templateUrl: 'loading-error-cover.html',
    styleUrl: 'loading-error-cover.scss',
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class LoadingErrorCover {
    @Output() tryAgain: EventEmitter<void> = new EventEmitter()
}
