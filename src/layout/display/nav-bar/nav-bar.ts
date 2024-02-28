import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/spacer-block/spacer-block";

@Component({
    imports: [
        RouterModule,
        SpacerBlock
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'nav-bar.scss',
    selector: 'nav-bar',
    host: { 'role': 'banner', 'aria-label': 'Nav bar', },
    templateUrl: 'nav-bar.html',
})
export class NavBar {
    @Output() openNavDrawer: EventEmitter<void> = new EventEmitter()
}
