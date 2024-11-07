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
import { IconButton } from "@/shared/display/icon-button/icon-button";

@Component({
    imports: [
        RouterModule,
        SpacerBlock,
        IconButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'nav-bar',
    host: {
        'role': 'banner',
        'aria-label': 'Nav bar',
    },
    templateUrl: 'nav-bar.html',
    styleUrl: 'nav-bar.scss',
    encapsulation: ViewEncapsulation.None,
})
export class NavBar {
    @Output() openNavDrawer: EventEmitter<void> = new EventEmitter()
}
