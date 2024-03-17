import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: "switchers-column.scss",
    selector: 'switchers-column',
    host: { 'role': 'group' },
    templateUrl: 'switchers-column.html',
})
export class SwitchersColumn {
}
