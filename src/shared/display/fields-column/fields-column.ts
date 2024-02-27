import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: "fields-column.scss",
    selector: 'fields-column',
    host: { 'role': 'group' },
    template: `
        <ng-content />
    `,
})
export class FieldsColumn { // column-organizer-for-switches
}
