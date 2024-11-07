import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'switch-group',
    host: { 'role': 'group' },
    templateUrl: 'switch-group.html',
    styleUrl: "switch-group.scss",
    encapsulation: ViewEncapsulation.None,
})
export class SwitchGroup {
}
