import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'spacer-block',
    host: {},
    template: ``,
    styles: `
        spacer-block {
            flex-grow: 1;
        }
    `,
    encapsulation: ViewEncapsulation.None,
})
export class SpacerBlock {
}
