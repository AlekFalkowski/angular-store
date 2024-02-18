import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA, EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        loading-process {
            max-width: $base-max-width;
            width: 100%;
            margin: 0 auto;
            padding-top: 80px;
            padding-inline: var(--inline-padding);
            display: flex;
            flex-direction: column;
            align-items: center;

            & > [data-e="loading-text"] {
                color: var(--md-sys-color-primary);
                @include MD3_HEADLINE_M_FONT_RULE_SET;
                text-transform: uppercase;
                text-align: center;
                text-wrap: balance;
            }
        }
    `,
    selector: 'loading-process',
    host: {},
    template: `
        <div data-e="loading-text" >Loading...</div >
    `,
    providers: []
})
export class LoadingProcess {
    @Output() tryAgain: EventEmitter<void> = new EventEmitter()
}
